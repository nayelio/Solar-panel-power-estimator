import { Position } from "@/pages";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

type Props = {
  setInputConsume: React.Dispatch<React.SetStateAction<string | undefined>>;
  inputConsume: string | undefined;
  inputkWhValues: string | undefined;
  setInputkWhValues: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function InputConsumeInformation(props: Props) {
  const kWhValue = 944.2793;
  return (
    <div>
      <TextField
        label="Consumo mensual"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        value={props.inputConsume}
        onChange={(e) => props.setInputConsume(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">kW</InputAdornment>,
        }}
      />

      <TextField
        label="Valor del kW/hr"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        value={props.inputkWhValues}
        onChange={(e) => props.setInputkWhValues(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">kw/hr</InputAdornment>
          ),
        }}
      />
    </div>
  );
}
