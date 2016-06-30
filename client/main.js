// Libs
import {Meteor} from 'meteor/meteor';
import {Vue} from 'meteor/akryum:vue';

// Api
import '/imports/api/methods';

// Main app
Meteor.startup(() => {
  new Vue({
    el: 'body',
    replace: false
  });
});
