/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Factory } from 'meteor/dburles:factory';
import log from '../../../utils/log';

import Common from './common';

import '../../pool_teams/pool_teams'; // needed for factory

import { assert } from 'chai';

describe('Email > Common', () => {
  it('puts together player emails', () => {
    const firstUser = Factory.create('user');

    const poolTeam = Factory.create('poolTeam', {
      userTeamName: 'first user',
      userId: firstUser._id,
    });
    const seasonId = poolTeam.seasonId;
    const poolId = poolTeam.poolId;

    const secondUser = Factory.create('user');

    Factory.create('poolTeam', {
      seasonId,
      poolId,
      userTeamName: 'second user',
      userId: secondUser._id,
    });

    const playerEmails = Common.getPlayerEmails(poolId, seasonId);

    assert.equal(playerEmails, `first user <${firstUser.emails[0].address}>, second user <${secondUser.emails[0].address}>`);
  });
});
