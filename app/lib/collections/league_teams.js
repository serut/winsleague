LeagueTeams = new Mongo.Collection('league_teams');

LeagueTeams.attachSchema(new SimpleSchema({
  leagueId: { type: String },
  cityName: { type: String },
  mascotName: { type: String },
  abbreviation: { type: String },
  conference: { type: String, allowedValues: ["AFC", "NFC"] },
  division: { type: String, allowedValues: ["North", "South", "East", "West"] }
}));

LeagueTeams.helpers({
  fullName: function () {
    return this.cityName + ' ' + this.mascotName;
  }
});

if (Meteor.isServer) {
  LeagueTeams.allow({
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

  LeagueTeams.deny({
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