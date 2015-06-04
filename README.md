# League Wins Pool

## Getting Started

1. [Install Node](https://nodejs.org/download/)
2. [Install Docker 1.6+](https://docs.docker.com/installation/)
3. If on Mac, install [Boot2Docker](https://docs.docker.com/installation/) and optionally [docker-osx-dev](https://github.com/brikis98/docker-osx-dev) (faster syncing of local files to Docker VM)
4. [Install Docker Compose 1.2+](https://docs.docker.com/compose/install/)
5. Install package dependencies

    ```bash
    $ (cd scripts; ./install-packages)
    ```

6. Install Git hooks so that dependencies are automatically installed when switching or merging branches

    ```bash
    $ (cd scripts; ./install-git-hooks)
    ```

7. Create secrets file and add passwords
    
    ```bash
    $ cp src/db/secrets.example.env src/db/secrets.env
    $ vim src/db/secrets.env
    ```

8. If on Mac, start Boot2Docker and docker-osx-dev

    ```bash
    $ boot2docker up
    $ (cd src/webapp; docker-osx-dev -l DEBUG)
    ```

9. Build the images on your local machine (needed due to [Docker Compose issue #1275](https://github.com/docker/compose/issues/1275))

    ```bash
    $ (cd src; docker-compose build)
    ```   
    

## Developing Locally

1. Launch the entire development environment:

    $ (cd src; docker-compose up)

    This links your local `src/webapp` folder to the container so that server-side changes automatically reload the server. 

2. To also monitor client-side changes, open a separate terminal tab and run:

    $ (cd src/webapp/client; grunt serve)

    Ideally we'd run `grunt serve` in the container itself but due to slow Boot2Docker issues, it's faster to run it outside. If you prefer to run this within the container, run:

    $ (cd src; docker-compose run webapp grunt serve --gruntfile /webapp/client/Gruntfile.js)

3. Open a browser to view changes:

    $ curl http://$(boot2docker ip)
    

## Running Tests
    
If running isolated tests contained to the webapp only, run:

    $ (cd src/webapp/client; grunt test)
    $ (cd src/webapp/server; grunt test)
    
If running tests that depend on other services such as the database, run them within Docker:

    $ (cd src; docker exec -it src_webapp_1 bash) 
    $ (cd /webapp/client; grunt test --gruntfile /webapp/client/Gruntfile.js)
    $ (cd /webapp/server; grunt test --gruntfile /webapp/server/Gruntfile.js)
    
    
## Running Database Migrations

Make sure the containers are running first.

    $ docker-compose run webapp /webapp/server/node_modules/.bin/sequelize db:migrate
    
Sequelize automatically syncs the database when the webapp starts. However, this only creates and drops tables -- it doesn't run pending migrations. That is currently done manually but we should figure out how to automate them as part of the deploy process. 
    

## Adding or Removing Node Packages

When changing either the client or server's `package.json`, run `npm shrinkwrap` in `src/webapp/client` and `src/webapp/server` to update the `npm-shrinkwrap.json` file. This ensures everyone is using the exact same package versions. Also update the `package.json` version number.


## Rebuilding Docker Images

The `webapp-base` image (`src/webapp-base/Dockerfile`) is used to manage core dependencies such as node and its global packages. Although changes should be rare, when doing so, rebuild and publish the image by running:

    $ cd src/webapp-base
    $ docker build -t leaguewinspool/webapp-base .
    $ docker push leaguewinspool/webapp-base

When changing any of the other Dockerfiles, rebuild the images by running:

    $ (cd src; docker-compose build)

Now you are ready for development again.


## Running a Staging Environment

These are the same commands the integration tests on CircleCI run:

    $ (cd src; docker-compose -f docker-production.yml up)
    $ (cd src; docker-compose -f docker-production.yml run webapp grunt test --gruntfile /webapp/client/Gruntfile.js)    # client-side
    $ (cd src; docker-compose -f docker-production.yml run webapp grunt test)    # server-side
    $ curl http://$(boot2docker ip)

The difference is `docker-production.yml` won't link your local code to the container.


## Deploying to Production

When code is merged into `master`, CircleCI runs the integration tests. If they pass, CircleCI notifies DockerHub to rebuild the `webapp` container. Once the build finishes, DockerHub notifies Tutum to swap the old container with the new `webapp` image.

The other containers are not deployed automatically because they rarely change. If they need updating:

1. On CircleCI, [clear the cache](https://circleci.com/docs/how-cache-works) and rerun the tests
2. On DockerHub, manually start a build on the updated container
3. On Tutum, redeploy the container
