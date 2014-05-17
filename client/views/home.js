Template.home.helpers({
  myAppVariable: function() {
    return Session.get('myAppVariable');
  }
});

Template.home.events({
	'click #logout' : function(event, template) {
    	Meteor.logout();
  	}
})
