Router.configure({
	layoutTemplate:'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
  waitOn: () => { return Meteor.subscribe('posts'); }
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction('dataNotFound','dashboard');

Router.route('/',{name:'postsList'});
Router.route('/articles');
Router.route('/es6List');
Router.route('/posts/:_id',{
  name: 'postPage',
  data: function () {
    return Posts.findOne(this.params._id);
  }
});