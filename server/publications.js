Meteor.publish('houses', function() {
  var houses = Houses.find({});
  return houses;
});

Meteor.publish('rooms', function() {
  var rooms = Rooms.find({});
  return rooms;
});

Meteor.publish('levels', function() {
  var levels = Levels.find({});
  return levels;
});
