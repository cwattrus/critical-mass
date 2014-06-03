Accounts.validateNewUser(function (user) {
  if (user.services.google.email.toString().indexOf('@thoughtworks.com')!= -1)
    return true;
  throw new Meteor.Error(403, "Join with your ThoughtWorks Google Account!");
});

Meteor.methods({
  usersEmailAddress: function () {
    return Meteor.user().services.google.email.toString();
  },
  promoteUserToAdmin: function (email) {
    if(Meteor.user().profile.admin) {
      var userToPromote = userFromEmail(email);
      if(userToPromote._id) {
        if(userToPromote.profile.admin) throw new Meteor.Error(403, "User already an admin!");
        else Meteor.users.update({_id:userToPromote._id}, {$set:{"profile.admin":true}});
      }
      else throw new Meteor.Error(403, "No user found!");
    }
    else throw new Meteor.Error(403, "You're not allowed to do that!");
  },
  demoteUserFromAdmin: function (email) {
    if(Meteor.user().profile.admin) {
      var userToDemote = userFromEmail(email);
      Meteor.users.update({_id:userToDemote._id}, {$set:{"profile.admin":false}});
    }
    else throw new Meteor.Error(403, "You're not allowed to do that!");
  },
  userPicture: function() {
    return Meteor.user().services.google.picture;
  },
});

function userFromEmail(emailAddress) {
  if(Meteor.users.findOne({"services.google.email": emailAddress})) {
    var user = Meteor.users.findOne({"services.google.email": emailAddress});
    return user;
  }
  else return false;
}
