import React from 'react';
import { observer } from 'mobx-react';
import { Doughnut, Radar, Bar } from 'react-chartjs-2';
import { jsonToChartData_dogHunt } from 'commons/transform';
import json from 'data/mainData.json';

function RightAside({ store }){

  return(
    <aside className='right'>
      <h4>Satisfaction: {Math.floor(store.societySatisfaction * 100)}%</h4>
      <div style={{width: '800px'}}>
        <Doughnut 
          data={store.chartDataDoughnut} 
          options={{
            animation: {
              duration: 0
            }
          }}
        />
        <Radar 
          data={store.chartDataRadar} 
          options={{
            animation: {
              duration: 0
            }
          }}
        />
        <Bar 
          data={store.chartSociety}
        />
      </div>
    </aside>
  );
}

export default observer(RightAside);