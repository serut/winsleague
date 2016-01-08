PoolUserTeams = new Mongo.Collection('pool_user_teams');

PoolUserTeams.attachSchema(new SimpleSchema({
  poolId: { type: String },
  userId: { type: String },
  userTeamName: { type: String },
  leagueTeamMascotNames: { type: [String], defaultValue: [] },
  totalWins: { type: Number, defaultValue: 0 },
  totalGames: { type: Number, defaultValue: 0 },
  totalPlusMinus: { type: Number, defaultValue: 0 }
}));

PoolUserTeams.helpers({
  prettyLeagueTeamMascotNames: function () {
    let string = '';
    for (name of this.leagueTeamMascotNames)
      string += `${name}, `
    if (string.length > 0)
      string = string.substr(0, string.length - 2);
    return string;
  }
});

if (Meteor.isServer) {
  PoolUserTeams.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  PoolUserTeams.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}