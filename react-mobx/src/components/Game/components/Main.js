import React from 'react';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';
import Slider from 'material-ui/Slider';

function Main({ store }){
  return(
    <div>
        <div style={{width: '440px'}}>
          <Doughnut
            data={store.chartDataDoughnut} 
            width={100} height={100}
            options={{
              animation: {
                duration: 0
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
        
    </div>
  );
}

export default observer(Main);