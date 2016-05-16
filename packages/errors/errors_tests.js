// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";
import { Template } from "meteor/templating";

// Here is an example.
Tinytest.add("Errors - collection", function(test) {
  test.equal(Errors.collection.find({}).count(), 0);

  Errors.throw('A new error!');
  test.equal(Errors.collection.find({}).count(), 1);

  Errors.collection.remove({});
});

Tinytest.addAsync("Errors - template", function(test, done) {
  Errors.throw('A new error!');
  test.equal(Errors.collection.find({}).count(), 1);

  // render the template
  var UI = $('.errors').data;

  UI.insert(UI.render(Template.meteorErrors), document.body);

  Meteor.setTimeout(function() {
    test.equal(Errors.collection.find({}).count(), 0);
    done();
  }, 3500);
});