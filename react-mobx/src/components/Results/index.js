import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer
export default class Results extends Component {
  @observable
  name = ''

  @observable
  age = ''

  @observable
  city = ''

  saveForm(){
    const { store } = this.props.route;
    store.name = this.name;
    store.age = this.age;
    store.city = this.city;
  }

  render(){
    return(
      <section id="result">
        <h2>Twój wynik:</h2>
        <div>
          <div className="profile-pic"></div>
          <div className="data">
            <h1 className="name">Jan, 55 lat</h1>
            <p>
              <p>priorytety</p>
              <p>BEZPIECZEŃSTWO</p>
              <p>KULTURA</p>
              <p>POMOC SPOŁECZNA</p>
            </p>
            <p>
              <p>wydatki</p>
              <p>323 mln</p>
            </p>
            <p>
              <p>deficyt</p>
              <p>123 mln</p>
            </p>
            <p>
              <p>zadowolenie społeczeństwa</p>
              <p>55%</p>
            </p>
          </div>
          <div className="graph"></div>
        </div>
        <div>
         <h1 className="final-result">masz <span >40%</span> szans na wygraną w wyborach!</h1>
         <h3>Twoją największą grupą wyborczą są: <span>EMERYCI</span></h3>
        </div>
       
      </section> 
    );
  }
}