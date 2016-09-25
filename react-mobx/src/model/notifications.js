//import notificationTypes from '..'

export default [
  {
    filter: (store) => store.getCurrentPropertySale >= 200,
    message: 'UWAŻAJ! Wyprzedajesz bezpowrotnie majątek miasta! To nie spodoba się Twoim wyborcom. Zobacz, jak spada zadowolenie społeczne! Postępuj ostrożnie!',
    level: 'warning'  
  },
  {
    filter: (store) => store.getPomocValue > 320,
    message: 'UWAŻAJ! Super, że dbasz o potrzebujących. Pamiętaj jednak, że budżet nie jest z gumy. Możesz wziąć kredyt, ale jednak zauważ, że zbliżasz się do limitu zadłużenia. Zwiększenie zadłużenia miasta wpłynie nie tylko na deficyt budżetowy w bieżącym roku, ale również na budżet długoterminowy. Postępuj ostrożnie!',
    level: 'info'  },
  {
    filter: (store) => store.getOswiataValue < 870,
    message: 'UWAŻAJ! Zbyt duże obcięcie wydatków na edukację sprawi, że będziesz musiał zamknąć trzy szkoły lub 1000 dzieci nie będzie mogło w przyszłym roku skorzystać z bezpłatnych obiadów w szkole. Postępuj ostrożnie, bo możesz rozgniewać swoich wyborców.',
    level: 'warning'
  }
];