Template.admin.events({
  'click #promote-to-admin': function(event, template) {
    Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.admin":true}});
  }
});
