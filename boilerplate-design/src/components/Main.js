import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const state = ({
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [450, 123, 67],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    borderColor: [
    '#e6e6e6',
    '#e6e6e6',
    '#e6e6e6'
    ],
    hoverBorderColor: [
    '#e6e6e6',
    '#e6e6e6',
    '#e6e6e6'
    ]
  }]
});

export default function Main(){
  return(
    <div style={{width: '400px'}}>
      <Doughnut width="100" height="100" data={state} />
    </div>
  );
}