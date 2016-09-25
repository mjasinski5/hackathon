//import notificationTypes from '..'

export default [
  {
    filter: (store) => store.societySatisfaction > 0.1,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam purus magna, dapibus ut sollicitudin vitae, lobortis sit amet justo. Nam molestie tellus at ultrices dapibus. ',
    level: 'success'
  },
  {
    filter: (store) => store.societySatisfaction < 0.1,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam purus magna, dapibus ut sollicitudin vitae, lobortis sit amet justo. Nam molestie tellus at ultrices dapibus.',
    level: 'warning'
  }
];