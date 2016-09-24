import React from 'react';
import Slider from 'material-ui/Slider';

export default function Sliders(){
  return(
    <div>
      <Slider step={0.10} value={.5} />
    </div>
  );
}