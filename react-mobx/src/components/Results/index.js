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
          <div>
            <h1 className="name">Jan, 55 lat</h1>
          </div>
          <div></div>
          <h2>masz <span className="">40%</span> szans na wygraną w wyborach!</h2>
        </div>
        <Link onClick={this.saveForm.bind(this)} to='app'>
          zagraj!
        </Link>
      </section> 
    );
  }
}