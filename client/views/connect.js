var userPicture;

if(Meteor.user()) {
  var userPicture;
  Meteor.call("userPicture", function (error, result) {
    userPicture = result;
  });
}

Template.connect.events({
  'click #connect-with-google': function(event, template) {
    Meteor.loginWithGoogle(function(error) {
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
  },
});

Template.layout.events({
  'click #logout' : function(event, template) {
      Meteor.logout();
    }
});
Template.layout.helpers({
  'picture' : function(event, template) {
    return userPicture;
  }
});
