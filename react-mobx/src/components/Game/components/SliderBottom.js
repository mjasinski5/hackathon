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
    <div className="bar-wrapper right" style={{height: '250px'}}>
  

      <div className="credit">
        <div className="credit-container">
          <p className="credit-description">Podatek od nieruchomości</p>
          <MuiThemeProvider muiTheme={getMuiTheme({
            slider: {
              trackColor: '#ed4f2f',
              selectionColor: '#ed4f2f'
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
              trackColor: '#ed2f2f',
              selectionColor: '#ed2f2f'
            },
          })}>
            <Slider 
              className='slider'
              step={100} 
              value={value} 
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