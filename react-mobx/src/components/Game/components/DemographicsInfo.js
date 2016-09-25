import React from 'react';
import Slider from 'material-ui/Slider';
import {HorizontalBar} from 'react-chartjs-2';
import Drawer from 'material-ui/Drawer';


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

export default class DemographicsInfo extends React.Component {

    constructor(props) {
    super(props);
    this.state = {open: false};
    }   

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    render(){

        const { store } = this.props;
        const { name, age, city } = store;

        return (
        <div>
            <button onClick={this.handleToggle.bind(this)} >zobacz dane demograficzne</button>
            <Drawer open={this.state.open} width={700} zDepth={1000}>
                <div className="demo">
                    <h6>{city}</h6>
                  <p className="demo-title">Dane demograficzne</p>
                  <div style={{width: '550px'}}>
                    <HorizontalBar width={60} height={60} data={data} />
                  </div>
                </div>
            </Drawer>
      </div>
        )
    } 

}


