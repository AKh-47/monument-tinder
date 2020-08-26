import React from "react";

import { IonButton } from "@ionic/react";

export default function End({ rightSwipeCount, resetState }) {
  return (
    <div className="end">
      <span>You got {rightSwipeCount}/10 correct</span>{" "}
      <IonButton
        onClick={resetState}
        color="secondary"
        className="ion-margin-top"
      >
        Try again
      </IonButton>
    </div>
  );
}
