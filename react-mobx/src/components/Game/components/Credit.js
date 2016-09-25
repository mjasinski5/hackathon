import React from 'react';
import Slider from 'material-ui/Slider';
import {Bar} from 'react-chartjs-2';

export default class Credit extends React.Component {
  
  render() {
    const { incomeOutcomeChartData} = this.props.store;
    console.log(this.props.store, incomeOutcomeChartData);

    return(
      <div>
        <div className="bar-wrapper" style={{height: '250px', paddingTop: '30px'}}>
          <Bar
            data={incomeOutcomeChartData}
            width={50}
            height={100}
            options={{
              legend: {
                display: false
              },
              animation: {
                duration: 0
              },
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: false
                    },
                    labels: {
                      show: true
                    },
                    barThickness: 40,
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
      </div>
    );
  }
}