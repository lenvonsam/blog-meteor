import { check } from 'meteor/check';
Meteor.publish('posts',()=>{
  return Posts.find();
});

Meteor.publish('comments', (postId) => {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});