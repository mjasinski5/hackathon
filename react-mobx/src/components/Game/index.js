import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Sliders from './components/Sliders';
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
        </section>
        <section className="onethird">
            <div>
                <div className="balance">
                    <h5>balans</h5>
                    <h2>{store.formatedOutcome}</h2>
                    <LinearProgress mode="determinate" value={store.currentLoanStateInPercent} color='#E23442' style={{height:'1.5em', width:'70%', float:'right'}}/>
                </div>
                <div className="credit">
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