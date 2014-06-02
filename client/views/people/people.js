Template.person.events({
  'click #edit-person-name' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "Their name changed?";
    notifier.multiline = false;
    notifier.placeholder = self.name;
    notifier.confirmation = "Name saved";
    notifier.confirmationDetail = "Now named - ";
    notifier.callback = function(self, val) {People.update({"_id":self._id}, {$set: {"name": val}});};
    showANotifier(notifier, self);
  },
  'click #edit-person-email' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "Give " + self.name + " an image with their gravatar email.";
    notifier.multiline = false;
    notifier.placeholder = self.email;
    notifier.confirmation = "Email saved";
    notifier.confirmationDetail = "Email set to ";
    notifier.callback = function(self, val) {People.update({"_id":self._id}, {$set: {"email": val, "image": Gravatar.imageUrl(val)}});};
    showANotifier(notifier, self);
  }
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
