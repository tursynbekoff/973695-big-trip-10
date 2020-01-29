import moment from 'moment';

export const formatTime = (date) => {
  return moment(date).format('LT');
};

export const formatDate = (date) => {
  return moment(date).format('L');
};