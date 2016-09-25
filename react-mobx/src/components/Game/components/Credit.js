import React from 'react';
import Slider from 'material-ui/Slider';
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['przychody', 'wydatki'],
  datasets: [
    {
      lineTension: 0,
      borderDash: [],
      borderDashOffset: 0.0,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 0],
      backgroundColor: '#999999'
    }
  ]
};

export default function Credit(){
  return(
    <div>
      <div className="bar-wrapper">
        <Bar
          data={data}
          width={50}
          height={100}
          options={{
            legend: {
                display: false
              },
            maintainAspectRatio: false,
            display: false,
            scales: {
              xAxes: [
                {
                  display: true,
                  gridLines: {
                    display: false
                  },
                  labels: {
                    show: true
                  }
                }
              ],
              yAxes: [
                {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
                  gridLines: {
                    display: false
                  },
                  labels: {
                    show: true
                  }
                }
                ]
              }
          }}
        />
      </div>
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
    </div>
  );
}