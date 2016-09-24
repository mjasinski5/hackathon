import React from 'react';
import Slider from './Slider';

export default function Sliders({ store }){
  const { outcomes } = store;
  const sliders = outcomes.values().map( (item, idx) => <Slider item={item} key={idx} />);
  return(
    <div className="sliders">
      {sliders}
    </div>
  );
}