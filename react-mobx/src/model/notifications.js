//import notificationTypes from '..'

export default [
  {
    filter: (store) => store.societySatisfaction > 0.5,
    message: 'GOOD!',
    level: 'success'
  },
  {
    filter: (store) => store.societySatisfaction < 0.2,
    message: 'BAD!',
    level: 'warning'
  }
];