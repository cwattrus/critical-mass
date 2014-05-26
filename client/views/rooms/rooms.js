Template.room.rendered = function() {
  $('.rateit').rateit();
}

Template.room.helpers({
  'rating' : function() {
    var self = this;
    if($.inArray(this._id, Meteor.user().profile.ratings)) {
      console.log(Meteor.user().profile.ratings);
      for (var i = 0; i < Meteor.user().profile.ratings.length; i++) {
          if(Meteor.user().profile.ratings[i].room==self._id) {
            return Meteor.user().profile.ratings[i].rating;
          }
      }
    }
    else( console.log("not found"));
  }
})

Template.room.events({
  'click .rateit' : function(event, template) {
    var room = this;
    Meteor.users.update({_id:Meteor.user()._id}, {$push:{"profile.ratings":{"room":room._id, "rating": template.find(".rateit-range").getAttribute("aria-valuenow")}}});
  }
})
