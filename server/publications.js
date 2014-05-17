Meteor.publish('pods', function() {
  var pods = Pods.find({});
  return pods;
});
