Meteor.publish('houses', function() {
  var houses = Houses.find({});
  return houses;
});

Meteor.publish('levels', function() {
  var levels = Levels.find({});
  return levels;
});
