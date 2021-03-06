import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
import {Bar} from 'react-chartjs-2';

@observer
export default class SliderBottom extends Component  {
  componentDidMount(){
  }

  render(){
    const { store } = this.props;

    const item = store.properties.get('sprzedaz');
    const itemTax = store.taxes.get('nieruchomosci');

    const { value, minValue, maxValue } = toJS(item);
    const itemTaxJS = toJS(itemTax);

    const valueTax = itemTaxJS.value;
    const minValueTax = itemTaxJS.minValue;
    const maxValueTax = itemTaxJS.maxValue;


    
    return(
    <div className="bar-wrapper right" style={{height: '300px'}}>
  

      <div className="credit">
        <div className="credit-container">
          <p className="credit-description">Podatek od nieruchomości</p>
          <MuiThemeProvider muiTheme={getMuiTheme({
            slider: {
              trackColor: '#f9c932',
              selectionColor: '#f9c932',
              handleFillColor: '#f9c932',
              handleColorZero: '#f9c932'              
            },
          })}>
            <Slider 
              className='slider'
              step={1} 
              value={valueTax} 
              min={minValueTax}
              max={maxValueTax}
              style={{height: 200}} 
              axis="y"
              sliderStyle={{margin:'0 0 5px 0'}}
              onChange={(event, value) => {
                this.value = value;
                itemTax.set('value', this.value);
              }}
              onDragStop={() => itemTax.set('value', this.value)}
            />
          </MuiThemeProvider>
        </div>
        <div className="credit-container">
          <p className="credit-description">Wyprzedaż majątku</p>
          <MuiThemeProvider muiTheme={getMuiTheme({
            slider: {
              trackColor: '#f9c932',
              selectionColor: '#f9c932',
              handleFillColor: '#f9c932',
              handleColorZero: '#f9c932'
            },
          })}>
            <Slider 
              className='slider'
              step={50} 
              value={value+1} 
              step={100} 
              min={minValue}
              max={maxValue}
              style={{height: 200}} 
              axis="y"
              sliderStyle={{margin:'0 0 5px 0'}}
              onChange={(event, value) => {
                this.value = value;
                item.set('value', this.value);
              }}
              onDragStop={() => item.set('value', this.value)}
              />
            </MuiThemeProvider>
        </div>
      </div>
    </div>
    );
  }
}