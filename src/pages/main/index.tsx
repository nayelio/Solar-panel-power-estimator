import { dividerClasses } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="body"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          marginInline: "5%",
          alignItems: "center",
          background: "white",
        }}
      >
        <div
          className="textAndbutton"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1
            style={{
              color: "black",
              fontFamily: "andada pro",
              fontSize: "70px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
            }}
          >
            TRANSFORMA, CRECE Y <span style={{ color: "#ED411A" }}>AHORRA</span>
          </h1>
          <h2
            style={{
              color: "black",
              fontFamily: "andada pro",
              fontSize: "25px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
            }}
          >
            Aprovecha el potencial solar de la regións y genera ahorros en
            facturas e impuestos
          </h2>
          <div
            style={{
              display: "inlineFlex",
              flexDirection: "column",
              alignItems: "flexStart",
              gap: "15px",
            }}
          >
            <button
              className="StartButton"
              style={{
                borderRadius: "80px",
                backgroundColor: "#ED411A",
                color: "white",
                fontSize: "18px",
                fontWeight: "500",
                height: "47px",
                width: "196.606px",
                boxShadow: "0px 10px 4px 0px rgbg(0,0,0,0.25)",
              }}
            >
              <Link href="/" style={{ color: "white" }}>
                Empieza ahora
              </Link>
            </button>
            <button
              className="StartButton"
              style={{
                borderRadius: "80px",
                backgroundColor: "#d9d9d9",
                color: "white",
                fontSize: "18px",
                fontWeight: "500",
                height: "47px",
                width: "196.606px",
                boxShadow: "0px 10px 4px 0px rgbg(0,0,0,0.25)",
              }}
            >
              <Link href="/" style={{ color: "black" }}>
                Más información
              </Link>
            </button>
          </div>
        </div>
        <Image
          src="/SunPower-main.png"
          width={650}
          height={650}
          alt="Picture of the author"
        />
      </div>
      <div
        style={{
          width: "80%",
          height: "40%",
          flexShrink: "0",
          borderRadius: "20px",
          background: "rgba(217, 217, 217, 0.20)",
          boxShadow: "0px 4px 4px 0px rgbg(0,0,0,0.24)",
          display: "flex",
          flexDirection: "row",
          padding: "5%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              color: "black",
              fontFamily: "andada pro",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
              width: "90%",
              textAlign: "left",
            }}
          >
            ¿Cuáles son nuestros servicios?
          </h3>
          <p
            style={{
              color: "black",
              fontFamily: "andada pro",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "400",

              textAlign: "left",
            }}
          >
            Toma decisiones con seguridad
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10%",
          }}
        >
          <Image
            src="/systemIcon.png"
            width={35}
            height={35}
            alt="Picture of the author"
          />
          <div>
            <h3
              style={{
                color: "black",
                fontFamily: "andada pro",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",

                textAlign: "left",
              }}
            >
              Recibe un presupuesto de potencia solar en la zona
            </h3>
            <p
              style={{
                color: "black",
                fontFamily: "andada pro",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                textAlign: "left",
              }}
            >
              Podras saber cuantos Watts en promedio aprovecharias al mes
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10%",
          }}
        >
          <Image
            src="/systemIcon.png"
            width={35}
            height={35}
            alt="Picture of the author"
          />
          <div>
            <h3
              style={{
                color: "black",
                fontFamily: "andada pro",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",

                textAlign: "left",
              }}
            >
              Conoce el sistema que se ajusta a tu necesidad{" "}
            </h3>
            <p
              style={{
                color: "black",
                fontFamily: "andada pro",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                textAlign: "left",
              }}
            >
              Sabrás que necesitas para tu sistema según la potencia solar de la
              zona{" "}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10%",
          }}
        >
          <Image
            src="/systemIcon.png"
            width={35}
            height={35}
            alt="Picture of the author"
          />
          <div>
            <h3
              style={{
                color: "black",
                fontFamily: "andada pro",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",

                textAlign: "left",
              }}
            >
              Conoce cual será tu ahorro{" "}
            </h3>
            <p
              style={{
                color: "black",
                fontFamily: "andada pro",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                textAlign: "left",
              }}
            >
              Sabrás cuál puede ser el coste de tu sistema y cuanto ahorro
              obtienes segun las leyes colombianas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
