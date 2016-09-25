import React from 'react';
import Slider from 'material-ui/Slider';
import {HorizontalBar} from 'react-chartjs-2';

export default function Demographics({ store }){
  return(
    <div className="demo" style={{zIndex: '2'}}>
      <p className="demo-title">Społeczeństwo</p>
      <div style={{width: '320px'}}>
        <HorizontalBar width={100} height={95} data={store.demographicsChartData} />
      </div>
    </div>
  );
}