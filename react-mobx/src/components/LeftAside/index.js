import React from 'react';
import Slider from 'components/Slider';

function LeftAside({ store }){
  const { outcomes } = store;
  const sliders = outcomes.values().map( (item, idx) => <Slider item={item} key={idx} />);
  return(
    <aside style={{width: '350px'}} className='left'>
      {sliders}
    </aside>
  );
}

export default LeftAside;