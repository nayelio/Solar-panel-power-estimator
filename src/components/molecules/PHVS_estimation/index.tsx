import { usePosition } from "@/contexts/PositionContext";
import { RectangleProps } from "@react-google-maps/api";
import { useMemo } from "react";

interface props {
  panels: RectangleProps["bounds"][];
}
export default function PHVSdescription(Props: props) {
  const { panels } = usePosition();

  const data = useMemo(() => {
    const data: RectangleProps["bounds"][] = [];

    panels.forEach((item) => {
      if (
        !data.some(
          (it) =>
            it[0] != item. &&
            it[1] != item[1] &&
            it[2] != item[2] &&
            it[3] != item[3]
        )
      ) {
        data.push(item);
      }
    });
  }, [panels]);

  console.log(panels);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "800%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "70%",
          width: "30%",
          marginBlockStart: "2%",
          alignItems: "start",
          gap: "10%",
          borderRadius: "30px",
          background: "#FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          padding: "2%",
        }}
      >
        <p
          style={{
            color: "#000",
            fontFamily: "Andada Pro",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
          }}
        >
          Paneles solares
        </p>
        <p
          style={{
            color: "#000",
            fontFamily: "Andada Pro",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
          }}
        >
          Cantidad: {panels.length / 4}
        </p>
        <p
          style={{
            color: "#000",
            fontFamily: "Andada Pro",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
          }}
        >
          Potencia: {}
        </p>
        <p
          style={{
            color: "#000",
            fontFamily: "Andada Pro",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
          }}
        >
          Inversor
        </p>
        <p
          style={{
            color: "#000",
            fontFamily: "Andada Pro",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
          }}
        >
          Cantidad: {}
        </p>
        <p
          style={{
            color: "#000",
            fontFamily: "Andada Pro",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
          }}
        >
          Potencia: {}
        </p>
      </div>
    </div>
  );
}
