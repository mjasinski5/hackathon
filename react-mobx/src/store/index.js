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
    console.log('11')
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


  @computed 
  get minSocietySatisfaction(){
    return this.society.values().reduce( (sum, group) => {
      return this._calc(group, sum, 'minValue');
    }, 0);
  }

  @computed 
  get maxSocietySatisfaction(){
    return this.society.values().reduce( (sum, group) => {
      return this._calc(group, sum, 'maxValue');
    }, 0);
  }
  
  @computed 
  get societySatisfaction(){
    const satisfaction = this.society.values().reduce( (sum, group) => {
     return this._calc(group, sum, 'value');
    }, 0);

    return this._convertToUnit(satisfaction, this.minSocietySatisfaction, this.maxSocietySatisfaction);
  }
  

  
  _convertToUnit(value, min, max){
    const k = (Math.abs(min) + min) === 0 ? Math.abs(min) : 0;
    return (value+k)/(max+k);
  }

  _calc(group, sum, propertyToGet) {
    const size = group.size
    const weights = group.weights
    const groupRate = weights.keys().reduce( (sum, name) => {
      const outcome = this.outcomes.get(name);
      return sum + this._calculateRate(outcome.get('baseValue'), outcome.get(propertyToGet), weights.get(name), size);
    }, 0);
    return sum + groupRate;
  }

  _calculateRate(baseValue, currentValue, weight, size){
    return (currentValue - baseValue) * weight * size;
  }

  @observable
  society = asMap()


}