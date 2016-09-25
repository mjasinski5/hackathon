import { observable, computed, asMap } from 'mobx';
import { createOutcomesFromJson, createDogHuntData, createDemographicsChartData, createIncomeOutcomeChartData } from 'commons/transform';
import json from 'data/mainData.json';

const taxWeight = 700000000;
export default class Store {
  constructor({ society }){
    this.society = asMap(society);
  }

  @observable
  name = 'Andrzej';

  @observable 
  age = '30';

  @observable
  city = 'Wrocław';

  @observable
  society = asMap()

  @observable
  outcomes = createOutcomesFromJson(json);
  @observable
  taxes = this._createTaxes();
  @observable
  incomes = this._createIncomeData();
  @observable
  properties = this._createPropertySaleData();

  
  @computed
  get chartDataDoughnut() { 
    return createDogHuntData(this.outcomes);
  } 

  @computed
  get getCurrentPropertySale() {
    return this.properties.get('sprzedaz').get('value');
  }
  
  @computed
  get demographicsChartData() {
    return createDemographicsChartData(this.society);
  }

  @computed 
  get incomeOutcomeChartData() {
    return createIncomeOutcomeChartData(this.getTotalIncome, this.getTotalOutcome);
  }

  @computed 
  get getOswiataValue() { 
    return this._getValueFromOutcome('Oświata i wychowanie');
  }

  @computed 
  get getPomocValue() { 
    return this._getValueFromOutcome('Pomoc Spoleczna');
  }

  _getValueFromOutcome(name) { 
    return this.outcomes.get(name).get('value');
  }
  
  _createPropertySaleData() { 
    return asMap({
      'sprzedaz' : asMap({
        value: 0,
        baseValue: 0,
        weight: 1000,
        minValue: 0,
        maxValue: 500
      })
    })
  }

  _createTaxes() {
    return asMap({
      'nieruchomosci': asMap({
        value: 5,
        baseValue: 5,
        minValue: 0,
        maxValue: 100,
        baseAmount: 435
      })
    })
  }

  _createIncomeData() { 
    return asMap({
      '1': asMap({
        name: 'Dochody Wlasne',
        value: 2581
      }),
      '2': asMap({
        name: 'Subwencja Ogolna',
        value: 555
      }),
      '3': asMap({
        name: 'Dotacje celowe z budżetu państwa',
        value: 173
      }),
      '4': asMap({
        name: 'Środki na zadania własne pozyskane z innych źródeł',
        value: 198
      }),
      '5': asMap({
        name: 'Dotacje i środki z funduszy',
        value: 21
      }),
      '6': asMap({
        name: 'Dotacje celowe na zadaniarealizowane na podstawie porozumień między jednostkami samorządu terytorialnego',
        value: 18
      })

    })
  }

  @computed
  get getTotalIncome(){
    return this._calculateTotalIncome(this.incomes, this.taxes);
  }

  @computed
  get getTotalOutcome() {
    let sum = 0;

    this.outcomes.values().forEach((o) => { 
      sum += o.get('value');
    });

    return sum;
  }

  @computed
  get maximumLoanValue() { 
   return 0.114 * this.getTotalIncome;
  }

  @computed
  get currentLoanState() { 
    return this.getTotalIncome - this.getTotalOutcome; 
  }
  @computed
  get getCurrentPropertyTaxRate() {
    return this.taxes.get('nieruchomosci').get('value');
  }
  @computed
  get currentLoanStateInPercent() {
    if(this.currentLoanState < 0 ) 
      return Math.min(this._round(Math.abs(this.currentLoanState * 100 / this.maximumLoanValue), 0), 100)
    else return 0;
  }

  @computed
  get formatedOutcome() { 
    return this._round(this.getTotalOutcome, 0);
  }

  _round(n, k) { 
    const factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
  }
  @computed
  get isLoadAllowed() { 
    const k = (Math.abs(this.currentLoanState) / this.getTotalIncome);
    return k < 0.115; // obliczone na papierze... dla reviewera!
  }


  _calculateTotalIncome(incomes, taxes) { 
    
    const income = this._getTotalAmountFromIncome(incomes);
    const incomeFromTax = this._getAmountFromTaxes(taxes)

    return income + incomeFromTax + this.getCurrentPropertySale;
  }

  _getTotalAmountFromIncome(incomes) { 
    let sum = 0;

    incomes.values().forEach((o) => { 
      sum += o.get('value');
    });

    return sum;
  }

  _getAmountFromTaxes(taxes) {
    let sum = 0;

    taxes.forEach((o) =>{
      const baseValue = o.get('baseValue');
      const baseAmount = o.get('baseAmount');
      const value = o.get('value');

      let result = (value * baseAmount) / baseValue;
      result = result - baseAmount;

      sum += result;
    });

    return sum;
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

  @computed
  get propertySaleSatifaction() { 
    return this._calulcatePropertySale(this.getCurrentPropertySale);
  }

  @computed
  get propertyTaxSatisfaction(){
    return this._calculatePropertyTax(this.taxes.get('nieruchomosci').get('value'));
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
    const propertySaleSatisfaction = this.propertySaleSatifaction;
    const propertyTaxSatisfaction = this.propertyTaxSatisfaction;

    const totalSatisfaction = satisfaction + taxesSatisfaction + propertySaleSatisfaction + propertyTaxSatisfaction;
    // const totalMinSatisfaction = this.minSocietySatisfaction + this.taxesMinSatisfaction;
    // const totalMaxSatisfaction = this.maxSocietySatisfaction + this.taxesMaxSatisfaction;

    return  Math.max(Math.min(this._convertToUnit(totalSatisfaction, this.minSocietySatisfaction, this.maxSocietySatisfaction), 1), 0);
    // return  this._convertToUnit(satisfaction, this.minSocietySatisfaction, this.maxSocietySatisfaction);
  }

  /**
   * CHANCES TO WIN
   */
  @computed 
  get minSocietySatisfactionOnlyVoters(){
    return this.society.values().reduce( (sum, group) => {
      return this._calc(group, sum, 'minValue', true);
    }, 0);
  }

  
  @computed 
  get maxSocietySatisfactionOnlyVoters(){
    return this.society.values().reduce( (sum, group) => {
      return this._calc(group, sum, 'maxValue', true);
    }, 0);
  }

  @computed 
  get moneySatisfactionOnlyVoters(){
    return this.society.values().reduce( (sum, group) => {
     return this._calc(group, sum, 'value', true);
    }, 0);
  }

  @computed
  get chancesToWin(){
    const satisfaction = this.moneySatisfactionOnlyVoters;
    const taxesSatisfaction =  this.taxesSatifsaction;
    const propertySaleSatisfaction = this.propertySaleSatifaction;
    const propertyTaxSatisfaction = this.propertyTaxSatisfaction;

    const totalSatisfaction = satisfaction + taxesSatisfaction +propertySaleSatisfaction + propertyTaxSatisfaction;

    const unit =  Math.max(Math.min(this._convertToUnit(totalSatisfaction, this.minSocietySatisfactionOnlyVoters, this.maxSocietySatisfactionOnlyVoters), 1), 0);
    console.log(unit);
    return Math.floor(unit*100);
  }
  
  _convertToUnit(value, min, max){
    const newMax = max / 4
    const k = (Math.abs(min) + min) === 0 ? Math.abs(min) : 0;
    return (value+k)/(newMax+k);
  }


  _calc(group, sum, propertyToGet, onlyVoters = false) {
    const size = onlyVoters ? Math.floor(group.size * group.voters) : group.size;
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
    return (baseValue - currentValue) * weight;
  }

  _calulcatePropertySale(currentValue, weight) {
      return -this._calculateRateTax(currentValue, 0, 10000000)
  }

  _calculatePropertyTax(currentValue) { 
    return this._calculateRateTax(currentValue, 0, 100000)
  }



}