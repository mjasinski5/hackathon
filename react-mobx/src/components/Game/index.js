import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Sliders from './components/Sliders';
import Main from './components/Main';
import Demographics from './components/Demographics';

@observer
export default class App extends Component {

  render(){
    const { store } = this.props.route;
    const { name, age, city } = store;
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
                    <h2>1 234 567 zł</h2>
                </div>
                <div className="credit">
                </div>
                <div className="demographics">
                    <Demographics />
                </div>
            </div>
        </section>
      </div>
    );
  }
}