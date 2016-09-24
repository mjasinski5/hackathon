import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Sliders from './components/Sliders';
import Credit from './components/Credit';
import Main from './components/Main';
import Demographics from './components/Demographics';
import LinearProgress from 'material-ui/LinearProgress';


@observer
export default class App extends Component {

  render(){
    const { store } = this.props.route;
    const { name, age, city } = store;
    console.log('currentLoanStateInPercent', store.currentLoanStateInPercent)
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
            <Credit />
        </section>
        <section className="onethird">
            <div>
                <div className="balance">
                    <h5>wydatki</h5>
                    <h2>{store.formatedOutcome} mln</h2>
                    <h5>zadłużenie</h5>
                    <div>
                        <LinearProgress mode="determinate" value={store.currentLoanStateInPercent} color='#E23442' style={{height:'1.5em', width:'70%', float:'right'}}/>
                        <p>0 %</p>
                    </div>
                </div>
                <div className="main-down">
                    <div className="balance"></div>
                    <div className="credit"></div>
                </div>
                <div className="society">
                    <button>zobacz dane demograficzne</button>
                    <Demographics store={store} />
                </div>
            </div>
        </section>
      </div>
    );
  }
}