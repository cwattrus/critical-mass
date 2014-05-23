Template.admin.events({
  'click #promote-to-admin': function(event, template) {
  	var email = template.find("#user_in_question").value;
  	Meteor.call('promoteUserToAdmin', email);
  },
  'click #demote-from-admin': function(event, template) {
    var email = template.find("#user_in_question").value;
  	Meteor.call('demoteUserFromAdmin', email);
  },
  'click #create-new-house': function(event, template) {
  	Houses.insert({"name": "Conversation and Activity", "image": 1});
  }
});

Template.admin.helpers({
	'houses': function() {
		return Houses.find({});
	}
})
