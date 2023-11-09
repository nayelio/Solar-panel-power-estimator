/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/molecules/NavBar";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
export default function AboutUs() {
  return (
    <div className={styles.container}>
      <br></br>
      <div className={styles.body}>
        <br></br>
        <h1 className={styles.h1}>
          Estamos aquí para ofrecerte una plataforma que cálcula tus{" "}
          <span className={styles.span}> ahorros </span> al instalar un sistema
          de paneles fotovoltaicos
        </h1>
        <img src="/aboutUs.jpg" alt="" width="40%" />
        <div className={styles.author}>
          <p className={styles.authorText}>Autora:</p>
          <p className={styles.authorNames}>Nayeli Ortega P.</p>
          <br></br>
          <p className={styles.authorText}>Asesores:</p>
          <p className={styles.authorNames}>
            Dr. Ing. Mauricio Pardo <br></br> Ing. Diego Gomez
          </p>
          <br></br>
          <p className={styles.authorText}>Asesor externo:</p>
          <p className={styles.authorNames}>Ing. Carlos Cachazo</p>
        </div>
      </div>
    </div>
  );
}

//<br></br> Mauricio Pardo <br></br> Diego Gomez
