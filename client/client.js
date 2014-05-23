Handlebars.registerHelper('user',function(){
   return Meteor.user();
});

Handlebars.registerHelper('isAdmin',function(){
  if(Meteor.user()) {
    if(Meteor.user().profile.admin) return true;
   }
   return false;
});
