import React from 'react';
import { Link } from 'react-router';

export default function LandingPage(){
  return(
    <section id="main-form">
      <h2>Wciel się w rolę <span className="blue">prezydenta</span></h2>
      <form>
        <label>imię:<input type="text" className="name" placeholder="Jan" /></label>
        <label>wiek:<input type="text" className="age" placeholder="27 lat" /></label>
        <label>miasto:<input type="text" className="city" placeholder="Wrocław" /></label>
      </form>
      <Link to='app'>
        zagraj!
      </Link>
    </section> 
  );
}