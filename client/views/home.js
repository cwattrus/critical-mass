Template.home.helpers({
  stickers: function() {
    return 2;
  },
  levels: function() {
    return Levels.find({});
  },
  complete: function() {
    if(this.complete) {
      return true;
    }
    return false;
  },
  houses: function() {
    return Houses.find({});
  },
  selected: function() {
    return Houses.findOne({});
  },
});

Template.home.events({
  'click #activate-circle-of-wow' : function(event, template) {
    $(".circle-of-wow").toggleClass("expanded");
  },
  'click .circle-of-wow' : function(event, template) {
    $(".circle-of-wow").removeClass("expanded");
  },
})

Template.houseCard.events({
  'click .house-card' : function(event, template) {
    Router.go('house', {_id: this._id});
  },
})

Template.house.helpers({
  rooms: function() {
    return Rooms.find({"house": this._id});
  },
  team: function() {
    if(this.team) {
        return People.find({"_id": {$in: this.team}});
    }
  },
  members: function() {
    var houseID = this._id;
    return People.find({"houses": houseID})
  },
})
Template.house.events({
  'click #add-room' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "What'd you like to call this room?";
    notifier.multiline = false;
    notifier.placeholder = "";
    notifier.confirmation = "Name saved";
    notifier.confirmationDetail = "Room is now called ";
    notifier.callback = function(self, val) {Rooms.insert({"title": val, "house": self._id});};
    showANotifier(notifier, self);
  },
	'click #edit-house-name' : function(event, template) {
		var self = this;
    var notifier = new Object;
    notifier.text = "What'd you like to call this house?";
    notifier.multiline = false;
    notifier.placeholder = self.name;
    notifier.confirmation = "Name saved";
    notifier.confirmationDetail = "House is now called ";
    notifier.callback = function(self, val) {Houses.update({"_id":self._id}, {$set: {"name": val}});};
    showANotifier(notifier, self);
	},
  'click #edit-house-image' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "What image would you like for this house?";
    notifier.multiline = false;
    notifier.placeholder = "1 - 5";
    notifier.confirmation = "Image1 Saved";
    notifier.confirmationDetail = "New image is saved.";
    notifier.callback = function(self, val) {Houses.update({"_id":self._id}, {$set: {"image": val}})};
    showANotifier(notifier, self);
  },
	'click #edit-house-description' : function(event, template) {
		var self = this;
    var notifier = new Object;
    notifier.text = "How would you best describe this house?";
    notifier.multiline = true;
    notifier.placeholder = self.description;
    notifier.confirmation = "Name Saved";
    notifier.confirmationDetail = "Description for this house is now: ";
    notifier.callback = function(self, description) {Houses.update({"_id":self._id}, {$set: {"description": description}})};
    var description = showANotifier(notifier, self);
	},
  'click #add-team-member' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "Add team member by email!";
    notifier.multiline = false;
    notifier.placeholder = "";
    notifier.confirmation = "Person added";
    notifier.confirmationDetail = "Added ";
    notifier.callback = function(self, val) {
      var person = People.findOne({"email": val});
      if(person) {
          console.log("person " + person.name + " found!");
          Houses.update({"_id":self._id}, {$push: {"team": person._id}});
      }
      else throw new Meteor.Error(403, "Person doesn't exist. Add them in admin!");
    };
    showANotifier(notifier, self);
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
  })).get().on('pnotify.confirm', function(error, notice, val) {
      try {
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
      }
      catch(err) {
          new PNotify({
            title: 'Oh No!',
            text: err.message,
            type: 'error'
          });
      }
  })
}
