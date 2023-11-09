/* eslint-disable @next/next/no-img-element */
import { Button, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import { ZoomIn } from "@mui/icons-material";
import { useEffect, useState } from "react";

const InfoConsume = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <div className={styles.container}>
      {isMobile ? (
        <div className={styles.img}>
          <div className={styles.image}>
            <img
              src="/aire_bill.png"
              alt=""
              width="100%"
              height="100%"
              loading="lazy"
              onClick={() => {
                ZoomIn;
              }}
              id="img"
            />{" "}
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.ButtonArrayContainer}>
              <div
                className={styles.accordeon}
                onClick={() => {
                  setMessageIndex(0);
                }}
              >
                Consumo
              </div>
              <div
                className={styles.accordeon}
                onClick={() => {
                  setMessageIndex(1);
                }}
              >
                Ubicación
              </div>
              <div
                className={styles.accordeon}
                onClick={() => {
                  setMessageIndex(2);
                }}
              >
                Área disponible
              </div>
            </div>
            <br></br>
            <p className={styles.p}>
              ¿Qué necesito saber para realizar la consulta?
            </p>
            {messageIndex === 0 ? (
              <div className={styles.descriptionContainer}>
                <h5 className={styles.h5}>Consumo</h5>
                <div className={styles.description}>
                  Revisa el consumo y la tarifa del proveedor en tu factura
                  mensual.{" "}
                </div>
              </div>
            ) : messageIndex === 1 ? (
              <div className={styles.descriptionContainer}>
                <h5 className={styles.h5}>
                  Ubicación y estrato socioeconomico
                </h5>
                <div className={styles.description}>
                  Ubica el lugar de interes y especifica a qué estrato
                  socioeconomico perteneces.
                </div>
              </div>
            ) : messageIndex === 2 ? (
              <div className={styles.descriptionContainer}>
                <h5 className={styles.h5}>Área disponible</h5>
                <div className={styles.description}>
                  Dibuja el área de la cual dispones para instalar tu sistema.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.img}>
          <div className={styles.image}>
            <img
              src="/aire_bill.png"
              alt=""
              width="100%"
              height="10%"
              loading="lazy"
              onClick={() => {
                ZoomIn;
              }}
              id="img"
            />{" "}
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.ButtonArrayContainer}>
              <div
                className={styles.accordeon}
                onClick={() => {
                  setMessageIndex(0);
                }}
              >
                Consumo
              </div>
              <div
                className={styles.accordeon}
                onClick={(e) => {
                  setMessageIndex(1);
                }}
              >
                Ubicación y estrato
              </div>
              <div
                className={styles.accordeon}
                onClick={() => {
                  setMessageIndex(2);
                }}
              >
                Área disponible
              </div>
            </div>
            <br></br>
            <p className={styles.p}>
              ¿Qué necesito saber para realizar la consulta?
            </p>
            {messageIndex === 0 ? (
              <div className={styles.descriptionContainer}>
                <h5 className={styles.h5}>Consumo</h5>
                <div className={styles.description}>
                  Revisa el consumo y la tarifa del proveedor en tu factura
                  mensual.{" "}
                </div>
              </div>
            ) : messageIndex === 1 ? (
              <div className={styles.descriptionContainer}>
                <h5 className={styles.h5}>
                  Ubicación y estrato socioeconomico
                </h5>
                <div className={styles.description}>
                  Ubica el lugar de interes y especifica a qué estrato
                  socioeconomico perteneces.
                </div>
              </div>
            ) : messageIndex === 2 ? (
              <div className={styles.descriptionContainer}>
                <h5 className={styles.h5}>Área disponible</h5>
                <div className={styles.description}>
                  Dibuja el área de la cual dispones para instalar tu sistema.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoConsume;
{
  /* <p>Revisa el consumo y la tarifa del proveedor en tu factura mensual</p> */
}
