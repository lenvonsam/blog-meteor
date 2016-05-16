import {Template} from 'meteor/templating';

// Meteor.subscribe('posts');

var postsData = [
  {
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  },
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  },
  {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];

// Template.postsList.qrCode = function(){
//   return qrScanner.message();
// };

if(Meteor.isClient) {
  qrScanner.on('scan',(err,message)=>{
    if(message) {
      alert(message);
    } else {
      alert(err);
    }
  });
}

Template.postsList.helpers({
  posts: ()=>{ return Posts.find({},{sort:{submitted:-1}});}
});