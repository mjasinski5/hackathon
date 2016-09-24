import React from 'react';
import Sliders from './components/Sliders';
import Main from './components/Main';

export default function App(){
  return(
  <div>
    <section className="onethird">
        <div>
            <div>
                <h1>Marek, 27 lat</h1>
                <h6>wanna be <strong>Prezydent miasta Wrocław</strong></h6>
            </div>
            <div>
                <Sliders />
            </div>
        </div>
    </section>
    <section className="onethird">
        <Main />
    </section>
    <section className="onethird">
        
    </section>
  </div>
  );
}