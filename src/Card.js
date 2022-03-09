import React from 'react';

export default function Card({ card, toggleCard }) {
 
  return <div>
    <label>
      {card.name} {card.desc} {card.atk}/{card.def}
    </label>
  </div>;
}
