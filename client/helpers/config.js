Accounts.ui.config({
  requestPermissions: {}


	// passwordSignupFields:'USERNAME_ONLY'
});

accountsUIBootstrap3.setLanguage('zh-CN');

//logout callback
accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) {console.log("Error:" + error);}
  Router.go('es6List');
}