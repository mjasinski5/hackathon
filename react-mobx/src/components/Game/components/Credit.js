import React from 'react';
import Slider from 'material-ui/Slider';

export default function Credit(){
  return(
    <div className="credit">
      <div className="credit-container">
        <p className="credit-description">Podatek od nieruchomości</p>
        <Slider step={0.10} value={.5} style={{height: 200}} axis="y"
          sliderStyle={{margin:'0 0 5px 0'}}/>
      </div>
      <div className="credit-container">
        <p className="credit-description">Wyprzedaż majątku</p>
        <Slider step={0.10} value={.5} style={{height: 200}} axis="y"
          sliderStyle={{margin:'0 0 5px 0'}}/>
      </div>
    </div>
  );
}