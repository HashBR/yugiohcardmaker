import React from 'react';
import star from './imgs/star.png'
import blank from './imgs/blankcard.png'

export default function Card({ card, toggleCard }) {
 
  return <div className="col-md-6 mb-12">
      <div className="card-wrapper">
        <div className="card-title">
          <span>{card.name}</span>
        </div>
        <div className="card-stars"> 
          <img src={star}></img>
          <img src={star}></img>
          <img src={star}></img>
        </div>
        <div className="card-img">
          <img src={blank}></img>
        </div>
        <div className="card-desc">
          <span>{card.desc}</span>
        </div>
        <div className="card-atk-def">
          <span className="card-atk">{card.atk}</span>
          <span className="card-def">{card.def}</span>
        </div>
      </div>
    </div>;
}
