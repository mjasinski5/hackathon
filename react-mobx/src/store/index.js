import { observable, computed, asMap } from 'mobx';
import { createOutcomesFromJson, createDogHuntData } from 'commons/transform';
import json from 'data/mainData.json';

export default class Store {
  constructor({ society }){
    this.society = asMap(society);
  }

  @observable
  name = 'Andrzej';

  @observable
  outcomes = createOutcomesFromJson(json);

  @computed
  get chartDataDoughnut() { 
    return createDogHuntData(this.outcomes);
  } 

  // @computed
  // get maxValue() {
  //   let sum = 0; 
  //   this.outcomes.values().forEach((o) => { 
  //     sum += value;
  //   });

  //   return sum;
  // }


  @observable
  society = asMap()

}