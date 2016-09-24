import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
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
    const { name, value, minValue, maxValue } = toJS(item);
    return(
      <div className='slider'>
        <h3>
          {name}
        </h3>
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
        />
      </div>
    );
  }
}