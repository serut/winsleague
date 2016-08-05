/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import moment from 'moment';
import MlbGameData from './mlb_game_data';

import MlbSeeds from '../../../startup/server/seeds/mlb';
import { Games } from '../../../api/games/games';
import { LeagueTeams } from '../../../api/league_teams/league_teams';

import { assert } from 'chai';
import sinon from 'sinon';

describe('MLB Game Data', function () {
  this.timeout(10000);

  beforeEach(() => {
    MlbSeeds.create();

    // it'd be great if this could be pulled from an external file but I couldn't figure out
    // how to get it to copy the external js file to the mirror
    sinon.stub(HTTP, 'get', function () {
      return {
        content: `{ "subject": "miniscoreboard_mlb_2016_06_15", "copyright" : "Copyright 2016 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt", "data" : {"games":{"last_modified":"","game":[{"game_type":"R","double_header_sw":"N","location":"Denver, CO","away_time":"3:10","time":"3:10","home_time":"1:10","home_team_name":"Rockies","ind":"S","original_date":"2016/06/15","home_team_city":"Colorado","venue_id":"19","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"147","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"col","away_sport_code":"mlb","home_win":"0","time_hm_lg":"3:10","away_name_abbrev":"NYY","league":"AN","time_zone_aw_lg":"-4","home_file_code":"col","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_nyamlb_colmlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"115","time_aw_lg":"3:10","away_team_city":"NY Yankees","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"nya","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 3:10","scheduled_innings":"9","venue_w_chan_loc":"USCO0105","away_team_name":"Yankees","gameday_link":"2016_06_15_nyamlb_colmlb_1","time_date_hm_lg":"2016/06/15 3:10","id":"2016/06/15/nyamlb-colmlb-1","home_name_abbrev":"COL","tiebreaker_sw":"N","ampm":"PM","home_division":"W","home_time_zone":"MT","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 3:10","home_ampm":"PM","game_pk":"447852","venue":"Coors Field","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"nyy","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"E"},{"game_type":"R","double_header_sw":"N","location":"Phoenix, AZ","away_time":"12:40","time":"3:40","home_time":"12:40","home_team_name":"D-backs","ind":"S","original_date":"2016/06/15","home_team_city":"Arizona","venue_id":"15","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"119","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"ari","away_sport_code":"mlb","home_win":"0","time_hm_lg":"3:40","away_name_abbrev":"LAD","league":"NN","time_zone_aw_lg":"-4","home_file_code":"ari","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_lanmlb_arimlb_1","time_zone":"ET","away_league_id":"104","home_team_id":"109","time_aw_lg":"3:40","away_team_city":"LA Dodgers","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"lan","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 3:40","scheduled_innings":"9","venue_w_chan_loc":"USAZ0166","away_team_name":"Dodgers","gameday_link":"2016_06_15_lanmlb_arimlb_1","time_date_hm_lg":"2016/06/15 3:40","id":"2016/06/15/lanmlb-arimlb-1","home_name_abbrev":"ARI","tiebreaker_sw":"N","ampm":"PM","home_division":"W","home_time_zone":"MST","away_time_zone":"PT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 3:40","home_ampm":"PM","game_pk":"447848","venue":"Chase Field","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"la","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"W"},{"game_type":"R","double_header_sw":"N","location":"San Diego, CA","away_time":"3:40","time":"3:40","home_time":"12:40","home_team_name":"Padres","ind":"S","original_date":"2016/06/15","home_team_city":"San Diego","venue_id":"2680","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"146","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"sdn","away_sport_code":"mlb","home_win":"0","time_hm_lg":"3:40","away_name_abbrev":"MIA","league":"NN","time_zone_aw_lg":"-4","home_file_code":"sd","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_miamlb_sdnmlb_1","time_zone":"ET","away_league_id":"104","home_team_id":"135","time_aw_lg":"3:40","away_team_city":"Miami","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"mia","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 3:40","scheduled_innings":"9","venue_w_chan_loc":"USCA0982","away_team_name":"Marlins","gameday_link":"2016_06_15_miamlb_sdnmlb_1","time_date_hm_lg":"2016/06/15 3:40","id":"2016/06/15/miamlb-sdnmlb-1","home_name_abbrev":"SD","tiebreaker_sw":"N","ampm":"PM","home_division":"W","home_time_zone":"PT","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 3:40","home_ampm":"PM","game_pk":"447849","venue":"Petco Park","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"mia","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"E"},{"game_type":"R","double_header_sw":"N","location":"San Francisco, CA","away_time":"2:45","time":"3:45","home_time":"12:45","home_team_name":"Giants","ind":"S","original_date":"2016/06/15","home_team_city":"San Francisco","venue_id":"2395","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"158","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"sfn","away_sport_code":"mlb","home_win":"0","time_hm_lg":"3:45","away_name_abbrev":"MIL","league":"NN","time_zone_aw_lg":"-4","home_file_code":"sf","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_milmlb_sfnmlb_1","time_zone":"ET","away_league_id":"104","home_team_id":"137","time_aw_lg":"3:45","away_team_city":"Milwaukee","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"mil","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 3:45","scheduled_innings":"9","venue_w_chan_loc":"USCA0987","away_team_name":"Brewers","gameday_link":"2016_06_15_milmlb_sfnmlb_1","time_date_hm_lg":"2016/06/15 3:45","id":"2016/06/15/milmlb-sfnmlb-1","home_name_abbrev":"SF","tiebreaker_sw":"N","ampm":"PM","home_division":"W","home_time_zone":"PT","away_time_zone":"CT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 3:45","home_ampm":"PM","game_pk":"447850","venue":"AT&T Park","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"mil","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"Washington, DC","away_time":"3:05","time":"4:05","home_time":"4:05","home_team_name":"Nationals","ind":"S","original_date":"2016/06/15","home_team_city":"Washington","venue_id":"3309","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"112","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"was","away_sport_code":"mlb","home_win":"0","time_hm_lg":"4:05","away_name_abbrev":"CHC","league":"NN","time_zone_aw_lg":"-4","home_file_code":"was","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_chnmlb_wasmlb_1","time_zone":"ET","away_league_id":"104","home_team_id":"120","time_aw_lg":"4:05","away_team_city":"Chi Cubs","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"chn","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 4:05","scheduled_innings":"9","venue_w_chan_loc":"USDC0001","away_team_name":"Cubs","gameday_link":"2016_06_15_chnmlb_wasmlb_1","time_date_hm_lg":"2016/06/15 4:05","id":"2016/06/15/chnmlb-wasmlb-1","home_name_abbrev":"WSH","tiebreaker_sw":"N","ampm":"PM","home_division":"E","home_time_zone":"ET","away_time_zone":"CT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 4:05","home_ampm":"PM","game_pk":"447843","venue":"Nationals Park","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"chc","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"Philadelphia, PA","away_time":"7:05","time":"7:05","home_time":"7:05","home_team_name":"Phillies","ind":"S","original_date":"2016/06/15","home_team_city":"Philadelphia","venue_id":"2681","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"141","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"phi","away_sport_code":"mlb","home_win":"0","time_hm_lg":"7:05","away_name_abbrev":"TOR","league":"AN","time_zone_aw_lg":"-4","home_file_code":"phi","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_tormlb_phimlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"143","time_aw_lg":"7:05","away_team_city":"Toronto","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"tor","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 7:05","scheduled_innings":"9","venue_w_chan_loc":"USPA1276","away_team_name":"Blue Jays","gameday_link":"2016_06_15_tormlb_phimlb_1","time_date_hm_lg":"2016/06/15 7:05","id":"2016/06/15/tormlb-phimlb-1","home_name_abbrev":"PHI","tiebreaker_sw":"N","ampm":"PM","home_division":"E","home_time_zone":"ET","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 7:05","home_ampm":"PM","game_pk":"447856","venue":"Citizens Bank Park","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"tor","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"E"},{"game_type":"R","double_header_sw":"N","location":"Boston, MA","away_time":"7:10","time":"7:10","home_time":"7:10","home_team_name":"Red Sox","ind":"S","original_date":"2016/06/15","home_team_city":"Boston","venue_id":"3","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"110","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"bos","away_sport_code":"mlb","home_win":"0","time_hm_lg":"7:10","away_name_abbrev":"BAL","league":"AA","time_zone_aw_lg":"-4","home_file_code":"bos","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_balmlb_bosmlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"111","time_aw_lg":"7:10","away_team_city":"Baltimore","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"bal","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 7:10","scheduled_innings":"9","venue_w_chan_loc":"USMA0046","away_team_name":"Orioles","gameday_link":"2016_06_15_balmlb_bosmlb_1","time_date_hm_lg":"2016/06/15 7:10","id":"2016/06/15/balmlb-bosmlb-1","home_name_abbrev":"BOS","tiebreaker_sw":"N","ampm":"PM","home_division":"E","home_time_zone":"ET","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 7:10","home_ampm":"PM","game_pk":"447842","venue":"Fenway Park","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"103","away_loss":"0","away_file_code":"bal","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"E"},{"game_type":"R","double_header_sw":"N","location":"Atlanta, GA","away_time":"7:10","time":"7:10","home_time":"7:10","home_team_name":"Braves","ind":"S","original_date":"2016/06/15","home_team_city":"Atlanta","venue_id":"16","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"113","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"atl","away_sport_code":"mlb","home_win":"0","time_hm_lg":"7:10","away_name_abbrev":"CIN","league":"NN","time_zone_aw_lg":"-4","home_file_code":"atl","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_cinmlb_atlmlb_1","time_zone":"ET","away_league_id":"104","home_team_id":"144","time_aw_lg":"7:10","away_team_city":"Cincinnati","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"cin","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 7:10","scheduled_innings":"9","venue_w_chan_loc":"USGA0028","away_team_name":"Reds","gameday_link":"2016_06_15_cinmlb_atlmlb_1","time_date_hm_lg":"2016/06/15 7:10","id":"2016/06/15/cinmlb-atlmlb-1","home_name_abbrev":"ATL","tiebreaker_sw":"N","ampm":"PM","home_division":"E","home_time_zone":"ET","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 7:10","home_ampm":"PM","game_pk":"447844","venue":"Turner Field","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"cin","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"Flushing, NY","away_time":"7:10","time":"7:10","home_time":"7:10","home_team_name":"Mets","ind":"S","original_date":"2016/06/15","home_team_city":"NY Mets","venue_id":"3289","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"134","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"nyn","away_sport_code":"mlb","home_win":"0","time_hm_lg":"7:10","away_name_abbrev":"PIT","league":"NN","time_zone_aw_lg":"-4","home_file_code":"nym","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_pitmlb_nynmlb_1","time_zone":"ET","away_league_id":"104","home_team_id":"121","time_aw_lg":"7:10","away_team_city":"Pittsburgh","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"pit","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 7:10","scheduled_innings":"9","venue_w_chan_loc":"USNY0504","away_team_name":"Pirates","gameday_link":"2016_06_15_pitmlb_nynmlb_1","time_date_hm_lg":"2016/06/15 7:10","id":"2016/06/15/pitmlb-nynmlb-1","home_name_abbrev":"NYM","tiebreaker_sw":"N","ampm":"PM","home_division":"E","home_time_zone":"ET","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 7:10","home_ampm":"PM","game_pk":"447853","venue":"Citi Field","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"pit","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"St. Petersburg, FL","away_time":"4:10","time":"7:10","home_time":"7:10","home_team_name":"Rays","ind":"S","original_date":"2016/06/15","home_team_city":"Tampa Bay","venue_id":"12","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"136","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"tba","away_sport_code":"mlb","home_win":"0","time_hm_lg":"7:10","away_name_abbrev":"SEA","league":"AA","time_zone_aw_lg":"-4","home_file_code":"tb","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_seamlb_tbamlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"139","time_aw_lg":"7:10","away_team_city":"Seattle","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"sea","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 7:10","scheduled_innings":"9","venue_w_chan_loc":"USFL0438","away_team_name":"Mariners","gameday_link":"2016_06_15_seamlb_tbamlb_1","time_date_hm_lg":"2016/06/15 7:10","id":"2016/06/15/seamlb-tbamlb-1","home_name_abbrev":"TB","tiebreaker_sw":"N","ampm":"PM","home_division":"E","home_time_zone":"ET","away_time_zone":"PT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 7:10","home_ampm":"PM","game_pk":"447854","venue":"Tropicana Field","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"103","away_loss":"0","away_file_code":"sea","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"W"},{"game_type":"R","double_header_sw":"N","location":"St. Louis, MO","away_time":"6:15","time":"7:15","home_time":"6:15","home_team_name":"Cardinals","ind":"S","original_date":"2016/06/15","home_team_city":"St. Louis","venue_id":"2889","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"117","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"sln","away_sport_code":"mlb","home_win":"0","time_hm_lg":"7:15","away_name_abbrev":"HOU","league":"AN","time_zone_aw_lg":"-4","home_file_code":"stl","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_houmlb_slnmlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"138","time_aw_lg":"7:15","away_team_city":"Houston","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"hou","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 7:15","scheduled_innings":"9","venue_w_chan_loc":"USMO0787","away_team_name":"Astros","gameday_link":"2016_06_15_houmlb_slnmlb_1","time_date_hm_lg":"2016/06/15 7:15","id":"2016/06/15/houmlb-slnmlb-1","home_name_abbrev":"STL","tiebreaker_sw":"N","ampm":"PM","home_division":"C","home_time_zone":"CT","away_time_zone":"CT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 7:15","home_ampm":"PM","game_pk":"447847","venue":"Busch Stadium","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"104","away_loss":"0","away_file_code":"hou","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"W"},{"game_type":"R","double_header_sw":"N","location":"Chicago, IL","away_time":"8:10","time":"8:10","home_time":"7:10","home_team_name":"White Sox","ind":"S","original_date":"2016/06/15","home_team_city":"Chi White Sox","venue_id":"4","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"116","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"cha","away_sport_code":"mlb","home_win":"0","time_hm_lg":"8:10","away_name_abbrev":"DET","league":"AA","time_zone_aw_lg":"-4","home_file_code":"cws","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_detmlb_chamlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"145","time_aw_lg":"8:10","away_team_city":"Detroit","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"det","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 8:10","scheduled_innings":"9","venue_w_chan_loc":"USIL0225","away_team_name":"Tigers","gameday_link":"2016_06_15_detmlb_chamlb_1","time_date_hm_lg":"2016/06/15 8:10","id":"2016/06/15/detmlb-chamlb-1","home_name_abbrev":"CWS","tiebreaker_sw":"N","ampm":"PM","home_division":"C","home_time_zone":"CT","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 8:10","home_ampm":"PM","game_pk":"447846","venue":"U.S. Cellular Field","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"103","away_loss":"0","away_file_code":"det","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"Kansas City, MO","away_time":"8:15","time":"8:15","home_time":"7:15","home_team_name":"Royals","ind":"S","original_date":"2016/06/15","home_team_city":"Kansas City","venue_id":"7","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"114","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"kca","away_sport_code":"mlb","home_win":"0","time_hm_lg":"8:15","away_name_abbrev":"CLE","league":"AA","time_zone_aw_lg":"-4","home_file_code":"kc","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_clemlb_kcamlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"118","time_aw_lg":"8:15","away_team_city":"Cleveland","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"cle","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 8:15","scheduled_innings":"9","venue_w_chan_loc":"USMO0460","away_team_name":"Indians","gameday_link":"2016_06_15_clemlb_kcamlb_1","time_date_hm_lg":"2016/06/15 8:15","id":"2016/06/15/clemlb-kcamlb-1","home_name_abbrev":"KC","tiebreaker_sw":"N","ampm":"PM","home_division":"C","home_time_zone":"CT","away_time_zone":"ET","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 8:15","home_ampm":"PM","game_pk":"447845","venue":"Kauffman Stadium","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"103","away_loss":"0","away_file_code":"cle","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"Anaheim, CA","away_time":"9:05","time":"10:05","home_time":"7:05","home_team_name":"Angels","ind":"S","original_date":"2016/06/15","home_team_city":"LA Angels","venue_id":"1","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"142","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"ana","away_sport_code":"mlb","home_win":"0","time_hm_lg":"10:05","away_name_abbrev":"MIN","league":"AA","time_zone_aw_lg":"-4","home_file_code":"ana","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_minmlb_anamlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"108","time_aw_lg":"10:05","away_team_city":"Minnesota","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"min","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 10:05","scheduled_innings":"9","venue_w_chan_loc":"USCA0027","away_team_name":"Twins","gameday_link":"2016_06_15_minmlb_anamlb_1","time_date_hm_lg":"2016/06/15 10:05","id":"2016/06/15/minmlb-anamlb-1","home_name_abbrev":"LAA","tiebreaker_sw":"N","ampm":"PM","home_division":"W","home_time_zone":"PT","away_time_zone":"CT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 10:05","home_ampm":"PM","game_pk":"447851","venue":"Angel Stadium of Anaheim","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"103","away_loss":"0","away_file_code":"min","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"C"},{"game_type":"R","double_header_sw":"N","location":"Oakland, CA","away_time":"9:05","time":"10:05","home_time":"7:05","home_team_name":"Athletics","ind":"S","original_date":"2016/06/15","home_team_city":"Oakland","venue_id":"10","gameday_sw":"P","away_win":"0","away_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"away_team_id":"140","tz_hm_lg_gen":"ET","status":"Preview","home_loss":"0","home_code":"oak","away_sport_code":"mlb","home_win":"0","time_hm_lg":"10:05","away_name_abbrev":"TEX","league":"AA","time_zone_aw_lg":"-4","home_file_code":"oak","game_data_directory":"/components/game/mlb/year_2016/month_06/day_15/gid_2016_06_15_texmlb_oakmlb_1","time_zone":"ET","away_league_id":"103","home_team_id":"133","time_aw_lg":"10:05","away_team_city":"Texas","day":"WED","tbd_flag":"N","tz_aw_lg_gen":"ET","away_code":"tex","game_media":{},"game_nbr":"1","time_date_aw_lg":"2016/06/15 10:05","scheduled_innings":"9","venue_w_chan_loc":"USCA0791","away_team_name":"Rangers","gameday_link":"2016_06_15_texmlb_oakmlb_1","time_date_hm_lg":"2016/06/15 10:05","id":"2016/06/15/texmlb-oakmlb-1","home_name_abbrev":"OAK","tiebreaker_sw":"N","ampm":"PM","home_division":"W","home_time_zone":"PT","away_time_zone":"CT","hm_lg_ampm":"PM","home_sport_code":"mlb","time_date":"2016/06/15 10:05","home_ampm":"PM","game_pk":"447855","venue":"O.co Coliseum","home_probable_pitcher":{"id":"","first_name":"","last_name":"","losses":"","wins":""},"home_league_id":"103","away_loss":"0","away_file_code":"tex","aw_lg_ampm":"PM","time_zone_hm_lg":"-4","away_ampm":"PM","away_division":"W"}],"date":"20160615"}}}`
      };
    });

    const year = 2016;
    const month = 6;
    const day = 15;

    MlbGameData.ingestDayData(year, month, day);
  });

  afterEach(() => {
    HTTP.get.restore();
  });

  describe('Ingest Day Data', () => {
    it('should ingest all games for on June 15, 2016', () => {
      const game = Games.findOne({ gameId: '2016_06_15_lanmlb_arimlb_1' });
      const diamondbacks = LeagueTeams.findOne({ cityName: 'Arizona', mascotName: 'Diamondbacks' });
      const dodgers = LeagueTeams.findOne({ cityName: 'Los Angeles', mascotName: 'Dodgers' });
      assert.equal(game.homeTeamId, diamondbacks._id);
      assert.equal(game.awayTeamId, dodgers._id);

      const gameMoment = moment(game.gameDate);
      assert.equal(gameMoment.year(), 2016);
      assert.equal(gameMoment.month(), 5); // it's zero-based so june is 5
      assert.equal(gameMoment.date(), 15);
    });
  });
});
