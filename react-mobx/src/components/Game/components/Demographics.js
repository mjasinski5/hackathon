import React from 'react';
import Slider from 'material-ui/Slider';
import {HorizontalBar} from 'react-chartjs-2';

const data = {
  labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '>80'],
  datasets: [
    {
      label: 'ile ludzi',
      backgroundColor: '#00BCD4',
      hoverBackgroundColor: '#00BCD4',
      data: [61317, 45222, 88582, 120268, 74511, 82526, 86230, 43142, 32689]
    }
  ]
};


export default function Demographics({ store }){
  return(
    <div className="demo">
      <p className="demo-title">Społeczeństwo</p>
      <div style={{width: '320px'}}>
        <HorizontalBar width={100} height={95} data={store.demographicsChartData} />
      </div>
    </div>
  );
}