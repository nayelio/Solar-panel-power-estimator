import { useRate } from "@/contexts/RateContext";
import { InputAdornment, TextField } from "@mui/material";

export default function InputConsumeInformation() {
  const {
    consume,
    setConsume,
    kwhPrice,
    setKwhPrice,
    securityRate,
    streetLightingRate,
  } = useRate();
  const kWhValue = 944.2793;
  console.log(securityRate?.Rate);
  console.log(streetLightingRate?.Rate);

  return (
    <div>
      <TextField
        label="Consumo mensual"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        value={consume ?? ""}
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          console.log({
            value,
          });
          if (isNaN(value)) {
            setConsume(0);
          } else {
            setConsume(value);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">kW</InputAdornment>,
        }}
      />

      <TextField
        label="Valor del kW/hr"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        value={kwhPrice ?? ""}
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) {
            setKwhPrice(0);
          } else {
            setKwhPrice(value);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">kw/hr</InputAdornment>
          ),
        }}
      />

      <p>
        Security Rate: {securityRate?.Rate} {securityRate?.Units}
        <br />
        Lightning Rate: {streetLightingRate?.Rate} {streetLightingRate?.Units}
        <br />
      </p>
    </div>
  );
}
