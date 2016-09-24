import React from 'react';
import Sliders from './components/Sliders';
import Main from './components/Main';
import Demographics from './components/Demographics';
import Slider from 'material-ui/Slider';


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