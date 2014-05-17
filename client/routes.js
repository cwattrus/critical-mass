Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  if(Meteor.isClient) {
    if(!Meteor.userId()) {
      this.redirect('connect');

    }
  }
}, {except: ['connect','config']});

Router.map(function() {
  this.route('admin', {
    path: '/admin',
    template: 'admin'
  });
  this.route('home', {
    path: '/',
    template: 'home'
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
