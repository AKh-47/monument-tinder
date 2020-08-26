import React from "react";
import "../styles/_start.scss";

import { IonButton } from "@ionic/react";

export default function Start({ setStart }) {
  return (
    <div className="start">
      <div className="start__instructions-container">
        <h1 className="start__instructions-title">Instructions</h1>
        <ul className="start__instructions-list">
          <li className="start__instruction">1. Tap to see the answer</li>
          <li className="start__instruction">
            2. Right swipe if you got it right
          </li>
          <li className="start__instruction">
            3. left swipe if you got it wrong
          </li>
        </ul>
      </div>

      <IonButton
        onClick={() => setStart(true)}
        color="secondary"
        className="ion-margin-top"
      >
        Start Swiping!
      </IonButton>
    </div>
  );
}
