import React from 'react';

const ALL_FACES = 56;

function getHappiesFacesCount(satisfaction){
  return Math.ceil((satisfaction*ALL_FACES)/100);
}

export default function({ satisfaction }){
  const happiesCount = getHappiesFacesCount(satisfaction);
  const happies = [...Array(happiesCount)].map( (_, idx) =>
    <div className="face face__happy" key={idx} />
  );
  const sads = [...Array(ALL_FACES-happiesCount)].map( (_, idx) =>
    <div className="face face__sad" key={idx} />
  )
  return(
    <div>
      {happies}
      {sads}
    </div>
  );
}