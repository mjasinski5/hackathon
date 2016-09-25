import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SliderMUI from 'material-ui/Slider';

@observer
export default class Slider extends Component  {
  @observable
  disabled = false

  @observable
  value = 0

  componentDidMount(){
    this.value = this.props.item.get('value');
  }

  updateStore(_, value){
    const { item } = this.props;
    this.value = value;
    item.set('value', this.value);
  }

  render(){
    const { item } = this.props;
    const { name, value, minValue, maxValue, chart } = toJS(item);
    const muiTheme = getMuiTheme({
      slider: {
        trackColor: chart.color,
        selectionColor: chart.color,
        handleFillColor: chart.color,
        handleColorZero: chart.color
      },
    });
    return(
      <div className='oneslider'>
        <p className='category'>
          {name}
        </p>
        <p className='cat-description'>
          {Math.floor(value)} mln
        </p>
        <MuiThemeProvider muiTheme={muiTheme}>
          <SliderMUI 
            className='slider'
            disabled={this.disabled}
            step={1}
            value={this.value} 
            min={minValue}
            max={maxValue}
            onChange={this.updateStore.bind(this)}
            sliderStyle={{margin:'0 0 5px 0'}}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}