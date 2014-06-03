Template.room.rendered = function() {
  $('.rateit').rateit();
}

Template.room.helpers({
  'rating' : function() {
    var self = this;
    if(Meteor.user().profile.ratings) {
      if($.inArray(this._id, Meteor.user().profile.ratings)) {
        for (var i = 0; i < Meteor.user().profile.ratings.length; i++) {
            if(Meteor.user().profile.ratings[i].room==self._id) {
              return Meteor.user().profile.ratings[i].rating;
            }
        }
      }
    }
    return false;
  },
  'rated' : function() {
    var self = this;
    if(Meteor.user().profile.ratings) {
      if($.inArray(this._id, Meteor.user().profile.ratings)) {
        for (var i = 0; i < Meteor.user().profile.ratings.length; i++) {
            if(Meteor.user().profile.ratings[i].room==self._id) {
              if(Meteor.user().profile.ratings[i].rating > 0) return true;
            }
        }
      }
    }
    return false;
  }
})

Template.room.events({
  'click .rateit' : function(event, template) {
    var room = this;
    Meteor.users.update({_id:Meteor.user()._id}, {$push:{"profile.ratings":{"room":room._id, "rating": template.find(".rateit-range").getAttribute("aria-valuenow")}}});
    if(People.findOne({"userID": Meteor.user()._id})) {
      var person = People.findOne({"userID": Meteor.user()._id});
      console.log(person._id);
      People.update({"_id": person._id}, {$push: {"houses": room.house}});
    }
    else {
      var newPerson = People.insert({"userID": Meteor.user()._id, "name": Meteor.user().profile.name, "houses": [room.house]});
      console.log(newPerson);
      Meteor.call('usersEmailAddress', function(error, result) {
          if(result) {
            People.update({"_id": newPerson}, {$set: {"email": result, "image": Gravatar.imageUrl(result)}});
          }
      });
    }
  },
  'click #edit-room-name' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "What'd you like to call this room?";
    notifier.multiline = false;
    notifier.placeholder = self.name;
    notifier.confirmation = "Name saved";
    notifier.confirmationDetail = "Room is now called ";
    notifier.callback = function(self, val) {
      Rooms.update(
        {"_id":self._id},
        {$set :
          {"title": val}
        }
      );
    };
    showANotifier(notifier, self);
  },
  'click #edit-room-description' : function(event, template) {
    var self = this;
    var notifier = new Object;
    notifier.text = "Give this room a description!";
    notifier.multiline = true;
    notifier.placeholder = self.name;
    notifier.confirmation = "Description saved";
    notifier.confirmationDetail = "Room's description set to ";
    notifier.callback = function(self, val) {Rooms.update({"_id":self._id}, {$set: {"description": val}});};
    showANotifier(notifier, self);
  },
  'click #add-room-team-member' : function(event, template) {
    var self = this;
    // showMingleTeam(self);
    var notifier = new Object;
    notifier.text = "Add team member by email!";
    notifier.multiline = false;
    notifier.placeholder = self.name;
    notifier.confirmation = "Person added";
    notifier.confirmationDetail = "Added ";
    notifier.callback = function(self, val) {
      var person = People.findOne({"email": val});
      if(person) {
          console.log("person " + person.name + " found!");
          Rooms.update({"_id":self._id}, {$push: {"team": person._id}});
      }
      else throw new Meteor.Error(403, "Person doesn't exist. Add them in admin!");
    };
    showANotifier(notifier, self);
  },
})

function showMingleTeam(self) {

}

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
