import React from 'react';

export default function({ satisfaction }){
  return(
    <div className="chart_satisfactions">
      {satisfaction}
      <div className="happyFace" />
    </div>
  );
}