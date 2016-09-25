//import notificationTypes from '..'

export default [
  {
    filter: (store) => store.getCurrentPropertySale >= 200,
    message: 'Warning about propertysale! ',
    level: 'warning'  },
  {
    filter: (store) => store.getPomocValue > 320,
    message: 'Info about good!',
    level: 'info'  },
  {
    filter: (store) => store.getOswiataValue < 870,
    message: 'UWAŻAJ! Zbyt duże obcięcie wydatków na edukację sprawi, że będziesz musiał zamknąć trzy szkoły lub 1000 dzieci nie będzie mogło w przyszłym roku skorzystać z bezpłatnych obiadów w szkole. Postępuj ostrożnie, bo możesz rozgniewać swoich wyborców.',
    level: 'warning'
  }
];