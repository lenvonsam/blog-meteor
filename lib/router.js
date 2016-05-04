Router.configure({
	layoutTemplate:'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

// Router.onBeforeAction('dataNotFound','dashboard');

Router.route('/',{name:'dashboard'});
Router.route('/articles');