import { Vue } from 'meteor/akryum:vue';
import moment from 'moment';

Vue.filter('dateFromNow', (date) => {
  return moment(date).fromNow();
});
