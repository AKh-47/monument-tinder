import React, { useEffect, useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  createGesture,
  IonGrid,
  IonRow,
  IonToast,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./styles/main.scss";

import Card from "./components/Card";
import EndScreen from "./components/EndScreen";

import monuments from "./Data";
import StartScreen from "./components/StartScreen";

const App: React.FC = () => {
  const cardRef = useRef<HTMLIonCardElement>();
  const [delta, setdelta] = useState<Array<number>>(Array(10).fill(0));
  const [rightSwipeCount, setRightSwipeCount] = useState<number>(0);
  const [currentIndex, setcurrentIndex] = useState<number>(
    monuments.length - 1
  );
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showFailureToast, setShowFailureToast] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);

  const resetState = () => {
    setdelta(Array(10).fill(0));
    setRightSwipeCount(0);
    setcurrentIndex(monuments.length - 1);
    setShowSuccessToast(false);
    setShowFailureToast(false);
  };

  const swipe = (element) =>
    createGesture({
      el: element,
      threshold: 15,
      gestureName: "swipe",
      onMove: (event) => {
        let newArr = Array(10).fill(0);
        newArr[currentIndex] = event.deltaX;
        setdelta(newArr);
      },
      onEnd: (event) => {
        if (event.deltaX < 150) {
          let newArr = Array(10).fill(0);
          newArr[currentIndex] = 0;
          setdelta(newArr);
        }
        if (event.deltaX > 150) {
          let newArr = Array(10).fill(0);
          newArr[currentIndex] = 600;
          setdelta(newArr);
          setRightSwipeCount((old) => old + 1);
          setShowSuccessToast(true);
          setcurrentIndex((old) => old - 1);
        }
        if (event.deltaX < -150) {
          let newArr = Array(10).fill(0);
          newArr[currentIndex] = -600;
          setdelta(newArr);
          setShowFailureToast(true);
          setcurrentIndex((old) => old - 1);
        }
      },
    });

  useEffect(() => {
    if (currentIndex >= 0 && start) {
      swipe(cardRef.current).enable();
    }
  });

  const cardArray = monuments.map((monumnet, index, arr) => {
    let offset = delta[currentIndex];

    const styles = {
      transform: `translate(${offset}px) rotate(${offset / 10}deg`,
      transition: ".2s all ease",
      margin: "2rem auto",
    };

    return (
      <Card
        styleObj={styles}
        refer={cardRef}
        image={monumnet.image}
        name={monumnet.name}
        desc={monumnet.desc}
        key={monumnet.name}
      />
    );
  });

  // return <StartScreen setStart={setStart} />;

  return (
    <IonApp>
      {/* ion-text-center ion-padding  */}
      <IonHeader class="header">Monument Tinder</IonHeader>
      {/* <IonHeader>Monument Tinder</IonHeader> */}
      <IonContent className="ion-text-center body">
        <IonGrid
          style={{ height: "100%" }}
          className="ion-align-items-center ion-justify-content-center"
        >
          <IonRow
            style={{ height: "100%" }}
            className="ion-justify-content-center ion-align-items-center"
          >
            {start ? null : <StartScreen setStart={setStart} />}
            {start ? (
              currentIndex >= 0 ? (
                cardArray[currentIndex]
              ) : (
                <EndScreen
                  rightSwipeCount={rightSwipeCount}
                  resetState={resetState}
                />
              )
            ) : null}
          </IonRow>
        </IonGrid>

        <IonToast
          mode="ios"
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Nice Work!"
          color="success"
          duration={450}
        />

        <IonToast
          mode="ios"
          isOpen={showFailureToast}
          onDidDismiss={() => setShowFailureToast(false)}
          message="Try Harder"
          color="danger"
          duration={450}
        />

        {/* <IonBackdrop /> */}
        {/* <IonButton onClick={resetState}>Reset</IonButton> */}
      </IonContent>
    </IonApp>
  );
};

export default App;
