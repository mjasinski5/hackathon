import React from 'react';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';

function RightAside({ store }){
    console.log('chartDataDoughnut', store.chartDataDoughnut)
  return(
    <aside className='right'>
      <p>{store.societySatisfaction}</p>
      <div style={{width: '800px'}}>
        <Doughnut 
          data={store.chartDataDoughnut} 
          options={{
            animation: {
              duration: 0
            }
          }}
        />
      </div>
    </aside>
  );
}

export default observer(RightAside);

//      <h4>Satisfaction: {Math.floor(store.societySatisfaction * 100)}%</h4>