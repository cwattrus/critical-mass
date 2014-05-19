Meteor.publish('houses', function() {
  var houses = Houses.find({});
  return houses;
});
