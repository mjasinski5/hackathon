import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer
export default class LandingPage extends Component {
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
      <section id="main-form">
        <h2>Wciel się w rolę <span className="blue">prezydenta</span></h2>
        <form>
          <label>imię:<input onChange={(e) => this.name = e.target.value} type="text" className="name" placeholder="Jan" /></label>
          <label>wiek:<input onChange={(e) => this.age = e.target.value} type="text" className="age" placeholder="27 lat" /></label>
          <label>miasto:<input onChange={(e) => this.city = e.target.value} type="text" className="city" placeholder="Wrocław" /></label>
        </form>
        <Link onClick={this.saveForm.bind(this)} to='app'>
          zagraj!
        </Link>
      </section> 
    );
  }
}