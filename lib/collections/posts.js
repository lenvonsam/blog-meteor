import { check } from 'meteor/check';

Posts = new Mongo.Collection('posts');

//validate
validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "请填写标题";
  if (!post.url)
    errors.url =  "请填写 URL";
  return errors;
};


//Posts hook handles
Posts.before.update(function(userId,doc,fieldNames,modifier,options){
  var isEq = doc.url == modifier.$set.url;
  var postWithSameLink = Posts.find({url: modifier.$set.url.trim()});
  if(postWithSameLink && !isEq) {
    alert('the same url');
    return false;
  } else {
    return true;
  }
});

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId,post,fieldNames){
    return (_.without(fieldNames,'url','title').length>0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});


Meteor.methods({
  postInsert:function(postAttributes) {
    check(Meteor.userId(),String);
    check(postAttributes,{
      title:String,
      url:String
    });
    var errors = validatePost(postAttributes);
    if (errors.title || errors.url) {
      throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");
    }

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes,{
      userId:user._id,
      author:user.username,
      submitted: new Date(),
      commentsCount: 0
    });

    var postId = Posts.insert(post);
    return {
      _id:postId
    };
  }
});

