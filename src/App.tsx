import React, { useEffect, useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonCard,
  createGesture,
  Gesture,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonToast,
  IonBackdrop,
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
import monuments from "./Data";

const App: React.FC = () => {
  const cardRef = useRef<HTMLIonCardElement>();
  const [delta, setdelta] = useState<number>(0);
  // const [delta, setdelta] = useState<Array<number>>(Array(10).fill(0));

  const [rightSwipeCount, setRightSwipeCount] = useState<number>(0);
  const [totalSwipeCount, setTotalSwipeCount] = useState<number>(0);
  const [currentIndex, setcurrentIndex] = useState<number>(9);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showFailureToast, setShowFailureToast] = useState<boolean>(false);

  const swipe = (element) =>
    createGesture({
      el: element,
      threshold: 15,
      gestureName: "swipe",
      onMove: (event) => {
        setdelta(event.deltaX);
      },
      onEnd: (event) => {
        if (event.deltaX < 150) {
          setdelta(0);
        }
        if (event.deltaX > 150) {
          setdelta(600);
          setRightSwipeCount((old) => old + 1);
          setcurrentIndex((old) => old - 1);
          setShowSuccessToast(true);
          setTotalSwipeCount((old) => old + 1);
        }
        if (event.deltaX < -150) {
          setdelta(-600);
          setcurrentIndex((old) => old - 1);
          setShowFailureToast(true);
          setTotalSwipeCount((old) => old + 1);
        }
      },
    });

  useEffect(() => {
    swipe(cardRef.current).enable();
  });

  const cardArray = monuments.map((mon, index, arr) => {
    // let ref;
    let offset = 0;
    if (index === currentIndex) {
      // ref = cardRef;
      offset = delta;
    }

    let styles;

    styles = {
      transform: `translate(${offset}px) rotate(${offset / 10}deg`,
      transition: ".2s all ease",
      margin: "2rem auto",
    };

    // if (9 - totalSwipeCount >= currentIndex) {
    //   styles = {
    //     transform: `translate(${offset}px) rotate(${offset / 10}deg`,
    //     transition: ".2s all ease",
    //     margin: "2rem auto",
    //     display: "none",
    //   };
    // } else {
    //   styles = {
    //     transform: `translate(${offset}px) rotate(${offset / 10}deg`,
    //     transition: ".2s all ease",
    //     margin: "2rem auto",
    //   };
    // }

    return (
      <Card
        styleObj={styles}
        refer={cardRef}
        image={mon.image}
        name={mon.name}
        key={mon.name}
      />
    );
  });

  return (
    <IonApp>
      {/* ion-text-center ion-padding  */}
      <IonHeader class="header">Monument Tinder</IonHeader>
      {/* <IonHeader>Monument Tinder</IonHeader> */}
      <IonContent className="ion-text-center body">
        <IonGrid className="align-items-center justify-content-center">
          <IonRow className="align-items-center">
            {/* {monuments.map((mon, index, arr) => {
              let ref;
              let offset = 0;
              if (index === currentIndex) {
                ref = cardRef;
                offset = delta;
              }

              let styles;

              // styles = {
              //   transform: `translate(${offset}px) rotate(${offset / 10}deg`,
              //   transition: ".2s all ease",
              //   margin: "2rem auto",
              //   display: "none",
              // };

              if (9 - totalSwipeCount >= currentIndex) {
                styles = {
                  transform: `translate(${offset}px) rotate(${offset / 10}deg`,
                  transition: ".2s all ease",
                  margin: "2rem auto",
                  display: "none",
                };
              } else {
                styles = {
                  transform: `translate(${offset}px) rotate(${offset / 10}deg`,
                  transition: ".2s all ease",
                  margin: "2rem auto",
                };
              }

              return (
                <Card
                  styleObj={styles}
                  refer={ref}
                  image={mon.image}
                  name={mon.name}
                  key={mon.name}
                />
              );
            })} */}
            {cardArray[currentIndex]}
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
      </IonContent>
    </IonApp>
  );
};

export default App;

{
  /* <IonCard
          style={{
            transform: `translate(${delta}px) rotate(${delta / 10}deg`,
            transition: ".2s all ease",
            position: "absolute",
            opacity: 0.6,
          }}
          id="card"
          ref={cardRef}
          class="ion-margin"
        >
          <IonCardContent style={{ padding: "5px 5px 0px 5px" }}>
            <img style={{}} src={test} alt="IMG" />
          </IonCardContent>
        </IonCard> */
}
