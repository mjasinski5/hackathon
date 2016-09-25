import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer
export default class Results extends Component {
  render(){
    const { store } = this.props.route;
    const { name, age, chancesToWin, societySatisfaction, formatedOutcome, currentLoanState } = store;
    return(
      <section id="result">
        <h2>Twój wynik:</h2>
        <div>
          <div className="profile-pic"></div>
          <div className="data">
            <h1 className="name">{name}, {age}</h1>
            <p>
              <p>priorytety</p>
              <p>BEZPIECZEŃSTWO</p>
              <p>KULTURA</p>
              <p>POMOC SPOŁECZNA</p>
            </p>
            <p>
              <p>wydatki</p>
              <p>{formatedOutcome} mln</p>
            </p>
            <p>
              <p>deficyt</p>
              <p>{Math.floor(currentLoanState*-1)} mln</p>
            </p>
            <p>
              <p>zadowolenie społeczeństwa</p>
          <p>{Math.floor(societySatisfaction*100)}%</p>
            </p>
          </div>
          <div className="graph"></div>
        </div>
        <div>
         <h1 className="final-result">masz <span >{chancesToWin}%</span> szans na wygraną w wyborach!</h1>
         <h3>Twoją największą grupą wyborczą są: <span>EMERYCI</span></h3>
        </div>
       
      </section> 
    );
  }
}