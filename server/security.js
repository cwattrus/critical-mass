Houses.allow({
  insert: function() {
    return allowAdmin();
  },
  update: function() {
    return allowAdmin();
  },
  remove: function() {
    return allowAdmin();
  },
})

Levels.allow({
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

Rooms.allow({
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

People.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
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
