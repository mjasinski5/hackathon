import { observable, computed, asMap } from 'mobx';
import { createOutcomesFromJson, createDogHuntData } from 'commons/transform';
import json from 'data/mainData.json';

const taxWeight = 700000000;
export default class Store {
  constructor({ society }){
    this.society = asMap(society);
  }

  @observable
  name = 'Andrzej';

  @observable
  outcomes = createOutcomesFromJson(json);
  @observable
  taxes = this._createTaxes();


  @computed
  get chartDataDoughnut() { 
    return createDogHuntData(this.outcomes);
  } 

  _createTaxes() {
    return asMap({
      'nieruchomosci': asMap({
        value: 5,
        baseValue: 5,
        minValue: 0,
        maxValue: 100
      }),
      'jakiesDrugie': asMap({
        value: 10,
        baseValue: 10,
        minValue: 0,
        maxValue: 100
      })
    })
  }



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
  get taxesSatifsaction(){ 
    return this._calcTaxValue(this.taxes, 'value');
  }

  @computed
  get taxesMaxSatisfaction() {
    return this._calcTaxValue(this.taxes, 'maxValue');
  }


  @computed
  get taxesMinSatisfaction() {
    return this._calcTaxValue(this.taxes, 'minValue');
  }

  @computed 
  get moneySatisfaction(){
    return this.society.values().reduce( (sum, group) => {
     return this._calc(group, sum, 'value');
    }, 0);
  }

  _calcTaxValue(taxes, propertyToCheck) {
    let sum = 0;
      
      const result = taxes.values().forEach( (curr) => { 
        const taxRate = this._calculateRateTax(curr.get('baseValue'), curr.get(propertyToCheck), taxWeight);
        sum += taxRate;
      });

    return sum;
  }  

  @computed 
  get societySatisfaction(){
    const satisfaction = this.moneySatisfaction;
    const taxesSatisfaction =  this.taxesSatifsaction;
    console.log('taxesSatisfaction', taxesSatisfaction)

    const totalSatisfaction = satisfaction + taxesSatisfaction;
    // const totalMinSatisfaction = this.minSocietySatisfaction + this.taxesMinSatisfaction;
    // const totalMaxSatisfaction = this.maxSocietySatisfaction + this.taxesMaxSatisfaction;

    return  this._convertToUnit(totalSatisfaction, this.minSocietySatisfaction, this.maxSocietySatisfaction);
    // return  this._convertToUnit(satisfaction, this.minSocietySatisfaction, this.maxSocietySatisfaction);
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

  _calculateRateTax(baseValue, currentValue, weight) { 
    console.log(baseValue, currentValue, weight)
    return (baseValue - currentValue) * weight;
  }

  @observable
  society = asMap()


}