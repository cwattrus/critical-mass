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
  }
});

Template.home.events({
  'click #activate-circle-of-wow' : function(event, template) {
    $(".circle-of-wow").toggleClass("expanded");
  },
  'click .circle-of-wow' : function(event, template) {
    $(".circle-of-wow").removeClass("expanded");
  }
})

Template.houseCard.events({
  'click .house-card' : function(event, template) {
    Router.go('house', {_id: this._id});
  },
})

Template.house.events({
	'click #edit-house-name' : function(event, template) {
		var self = this;

		(new PNotify({
		    text: "What'd you like to call this house?",
		    icon: 'fa fa-question',
		    hide: false,
		    confirm: {
		        prompt: true
		    },
		    buttons: {
		        closer: false,
		        sticker: false
		    },
		    history: {
		        history: false
		    }
		})).get().on('pnotify.confirm', function(e, notice, val) {
			console.log(self);
			Houses.update({"_id":self._id}, {$set: {"name": val}});

		    notice.cancelRemove().update({
		        title: 'Name saved',
		        text: 'House is now called ' + $('<div/>').text(val).html() + '.',
		        icon: 'fa fa-check',
		        type: 'info',
		        hide: true,
		        confirm: {
		            prompt: false,
        			prompt_default: self.name
		        },
		        buttons: {
		            closer: true,
		            sticker: true
		        }
		    });
		})
	},
		'click #edit-house-description' : function(event, template) {
		var self = this;

		(new PNotify({
		    text: "How would you best describe this house?",
		    icon: 'fa fa-question',
		    hide: false,
		    confirm: {
		        prompt: true,
		        prompt_multi_line: true,
        		prompt_default: self.description
		    },
		    buttons: {
		        closer: false,
		        sticker: false
		    },
		    history: {
		        history: false
		    }
		})).get().on('pnotify.confirm', function(e, notice, val) {
			console.log(self);
			Houses.update({"_id":self._id}, {$set: {"description": val}});

		    notice.cancelRemove().update({
		        title: 'Name saved',
		        text: 'Description for this house is now: ' + $('<div/>').text(val).html() + '.',
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
	},
})
