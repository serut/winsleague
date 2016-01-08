Seasons = new Mongo.Collection('seasons');

Seasons.attachSchema(new SimpleSchema({
  leagueId: { type: String },
  year: { type: Number }
}));

if (Meteor.isServer) {
  Seasons.allow({
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

  Seasons.deny({
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