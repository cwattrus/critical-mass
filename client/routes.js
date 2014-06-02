Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {

  if(Meteor.isClient) {
    if(!Meteor.userId()) {
      this.redirect('welcome');
    } else if (this.route.name == "admin" ){
      if(Meteor.user()) {
        if(!Meteor.user().profile.admin) {
          this.redirect("home");
        }
      }
    }
  }
}, {except: ['welcome','connect','config']});

Router.map(function() {
  this.route('admin', {
    path: '/admin',
    template: 'admin'
  });
  this.route('intro', {
    path: '/intro',
    template: 'intro'
  });
  this.route('welcome', {
    path: '/welcome',
    template: 'welcome'
  });
  this.route('home', {
    path: '/',
    template: 'home'
  });
  this.route('house', {
    path: '/house/:_id',
    data: function() {
      return Houses.findOne({ "_id": this.params._id });
    },
    template: 'house'
  });
  this.route('connect', {
    path: '/',
    template: 'connect'
  });
  this.route('config', {
    path: '/config',
    template: 'config'
  });
});
