import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SliderMUI from 'material-ui/Slider';

@observer
export default class Slider extends Component  {
  @observable
  value = 0

  componentDidMount(){
    this.value = this.props.item.get('value');
  }

  render(){
    const { item } = this.props;
    const { name, value, minValue, maxValue, chart } = toJS(item);
    const muiTheme = getMuiTheme({
      slider: {
        trackColor: chart.color,
        selectionColor: chart.color
      },
    });
    return(
      <div>
        <p className='category'>
          {name}
        </p>
        <MuiThemeProvider muiTheme={muiTheme}>
          <SliderMUI 
            description={`${this.value}`}
            step={1}
            value={value} 
            min={minValue}
            max={maxValue}
            onChange={(event, value) => {
              this.value = value;
              item.set('value', this.value);
            }}
            onDragStop={() => item.set('value', this.value)}
            sliderStyle={{margin:'0 0 5px 0'}}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}