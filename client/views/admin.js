Template.admin.events({
  'click #promote-to-admin': function(event, template) {
  	var email = template.find("#user_in_question").value;
  	Meteor.call('promoteUserToAdmin', email, function(error, result) {
      if(error.message) {
        new PNotify({
          title: 'Oh No!',
          text: error.message,
          type: 'error'
        });
      }
      else {
        new PNotify({
          title: 'Yay!',
          text: email + " is now an admin!",
          type: 'info'
        });
      }
    });
  },
  'click #demote-from-admin': function(event, template) {
    var email = template.find("#user_in_question").value;
  	Meteor.call('demoteUserFromAdmin', email);
  },
  'click #create-new-house': function(event, template) {
  	Houses.insert({"name": "Conversation and Activity", "image": 1});
  },
  'click #create-new-person': function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "What is this person's name?";
    notifier.multiline = false;
    notifier.placeholder = "Full name";
    notifier.confirmation = "Name saved";
    notifier.confirmationDetail = "Now available - ";
    notifier.callback = function(self, val) {People.insert({"name": val, "image": "profile.png"});};
    showANotifier(notifier, self);
  }

});

Template.admin.helpers({
	'houses': function() {
		return Houses.find({});
	},
  'people': function() {
    return People.find({});
  },
})

function showANotifier(notifier, self) {
  (new PNotify({
      text: notifier.text,
      icon: 'fa fa-question',
      hide: false,
      confirm: {
          prompt: true,
          prompt_multi_line: notifier.multiline,
          prompt_default: notifier.placeholder
      },
      buttons: {
          closer: false,
          sticker: false
      },
      history: {
          history: false
      }
  })).get().on('pnotify.confirm', function(e, notice, val) {
      notifier.callback(self, val);
      notice.cancelRemove().update({
          title: notifier.confirmation,
          text: notifier.confirmationDetail + $('<div/>').text(val).html() + '.',
          icon: 'fa fa-check',
          type: 'info',
          hide: true,
          confirm: {
              prompt: false
          },
          buttons: {
              closer: true,
              sticker: true
          }
      });
  })
}
