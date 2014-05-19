Houses.allow({
  insert: function() {
    return allowAdmin();
  },
  update: function() {
    return allowAdmin();
  },
  remove: function() {
    return allowAdmin();
  }
})

function allowAdmin() {
  if(Meteor.user().profile.admin==true) {
    return true;
  }
  else return false;
}
