Template.home.helpers({
  myAppVariable: function() {
    return Session.get('myAppVariable');
  }
});

Template.home.events({
  'click #connect-with-google': function(event, template) {
    Meteor.loginWithGoogle({"forceApprovalPrompt":true},function(error) {
      if(error) {
        new PNotify({
          title: 'Oh No!',
          text: 'Something went wrong.',
          type: 'error'
        });
      };
    });
  }
});
