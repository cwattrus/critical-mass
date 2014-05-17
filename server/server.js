Accounts.validateNewUser(function (user) {
  if (user.services.google.email.toString().indexOf('@thoughtworks.com')!= -1)
    return true;
  throw new Meteor.Error(403, "Join with your ThoughtWorks Google Account!");
});