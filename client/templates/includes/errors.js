Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.errors.onRendered(function() {
  console.log('errors.onRendered');
  var error = this.data;
  if(error) {
    Meteor.setTimeout(function () {
      Errors.remove(error._id);
    }, 3000);
  }
});