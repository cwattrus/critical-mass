Template.connect.events({
  'click #connect-with-google': function(event, template) {
    Meteor.loginWithGoogle({"forceApprovalPrompt":true},function(error) {
      if(error) {
        new PNotify({
          title: 'Oh No!',
          text: error,
          type: 'error'
        });
      }
      else {
        Router.go('home');
      }
    });
  }
});
