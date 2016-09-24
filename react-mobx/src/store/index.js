import { observable, asMap } from 'mobx';

export default class Store {
  constructor({ society }){
    this.society = asMap(society);
  }

  @observable
  name = 'Andrzej'

  @observable
  society = asMap()

}