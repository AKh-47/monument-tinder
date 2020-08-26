import React from "react";

import "../styles/card.scss";

export default function Card({ image, styleObj, refer, name, desc }) {
  return (
    <div style={styleObj} ref={refer} className="card">
      <div
        style={{ backgroundImage: `url("${image}")` }}
        className="card__side card__side--front"
      ></div>
      <div
        style={{
          backgroundImage: `url("${image}")`,
        }}
        className="card__side card__side--back"
      >
        {name}
        <div className="card__desc">{desc}</div>
      </div>
    </div>
  );
}
