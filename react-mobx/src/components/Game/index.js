import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

import Sliders from './components/Sliders';
import Credit from './components/Credit';
import Main from './components/Main';

import DemographicsInfo from './components/DemographicsInfo';
import LinearProgress from 'material-ui/LinearProgress';
import SliderBottom from './components/SliderBottom';
import ChartSatisfaction from './components/ChartSatisfaction';

import notifications from 'model/notifications'
import notificationsFunc from 'commons/notification';
import NotificationSystem from 'react-notification-system';

@observer
export default class App extends Component {

 
  
  render(){
    const { store } = this.props.route;
    const { name, age, city, isLoadAllowed } = store;

    console.log('currentLoanStateInPercent', store.currentLoanStateInPercent)
    console.log('isLoadAllowed', isLoadAllowed)
    console.log('getTotalIncome', store.getTotalIncome)
        console.log('outCome', store.getTotalOutcome)

    console.log('currentLoanState', store.currentLoanState)

    
    return(
      <div>
        <section className="onethird">
            <div>
                <div>
                    <h1>{name}, {age}</h1>
                    <h6>wanna be <strong>Prezydent miasta {city}</strong></h6>
                </div>
                <div>
                  <Sliders store={store} />
                </div>
            </div>
        </section>
        <section className="onethird">
            <Main store={store} />
            <div>
            <SliderBottom store={store}/>
            <Credit store={store}/>
            </div>
        </section>
        <section className="onethird">
            <div>
                <div className="balance">
                    <h5>Wydałeś już:</h5>
                    <h2>{store.formatedOutcome} mln</h2>
                    <h5>Zadłużyłeś miasto na:</h5>
                    <h4>{store.formatedLoanState} mln</h4>
                    <h5>Limit zadłużenia:</h5>
                    <div>
                        <LinearProgress mode="determinate" value={store.currentLoanStateInPercent} color='#E23442' style={{height:'1.5em', width:'70%', float:'right'}}/>
                        <p>{store.currentLoanStateInPercent} %</p>
                    </div>
                </div>
                <div className="main-down">
                    <div className="balance"></div>
                    <div className="credit"></div>
                </div>
                <div className="society">
                    <p className="society-title">Społeczeństwo</p>
                    <DemographicsInfo store={store}/>
                    <div className="right">
                        <ChartSatisfaction satisfaction={Math.floor(store.societySatisfaction*100)} />
                        <Link 
                            to='result'  
                            className={`results ${isLoadAllowed ? '' : 'results--disabled'}`}
                            onClick={(e)=>{
                                if(isLoadAllowed)
                                    return;
                                e.preventDefault();
                            }}
                        >
                            WYNIKI WYBORÓW
                        </Link>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }
}