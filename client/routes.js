Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });
  this.route('config', {
    path: '/config',
    template: 'config'
  });
});
