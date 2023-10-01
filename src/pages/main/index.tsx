import { dividerClasses } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <div
      className="body"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "90%",
        marginInline: "5%",
        alignItems: "center",
      }}
    >
      <div
        className="textAndbutton"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ textAlign: "left", fontSize: "60px" }}>
          TRANSFORMA, CRECE Y <span style={{ color: "#35428D" }}>AHORRA</span>
        </h1>
        <h2>
          Aprovecha el potencial solar de la región y genera ahorros en facturas
          e impuestos
        </h2>
        <button
          className="StartButton"
          style={{
            backgroundColor: "#35428D",
            width: "40%",
            height: "40px",
            fontSize: "18px",
            color: "#ffffff",
            borderRadius: "20px",
            border: "none",
            boxShadow: "-moz-initial",
          }}
        >
          <Link href="/" style={{ color: "white" }}>
            Empieza ahora
          </Link>
        </button>
      </div>
      <Image
        src="/MainPanel.png"
        width={700}
        height={700}
        alt="Picture of the author"
      />
    </div>
  );
}
