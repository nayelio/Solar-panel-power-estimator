import { useRate } from "@/contexts/RateContext";
import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { TownEnum } from "../RateResults";

export const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";

type Place = {
  place_id: string;
  lat: number;
  lng: number;
  description: string;
};

type Props = {
  onSelectPlace: (place: Place) => void;
};

const townsToSearch = [
  TownEnum.Barranquilla,
  TownEnum.Galapa,
  TownEnum.PuertoColombia,
  TownEnum.Soledad,
];

const InputSearchPlace = ({ onSelectPlace }: Props) => {
  const { setTown, consume, kwhPrice } = useRate();
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey,
  });
  const [place, setPlace] = useState<Place | null>(null);
  const isMobile = useMediaQuery("(max-width: 480px)");

  const onPress = (item: google.maps.places.AutocompletePrediction | null) => {
    if (!item) return;
    placesService?.getDetails(
      {
        placeId: item.place_id,
      },
      (placeDetails) => {
        const lat = placeDetails?.geometry?.location?.lat();
        const lng = placeDetails?.geometry?.location?.lng();
        if (lat && lng) {
          setPlace({
            description: item.description,
            lat,
            lng,
            place_id: item.place_id,
          });
          onSelectPlace({
            description: item.description,
            lat,
            lng,
            place_id: item.place_id,
          });
          const town = placeDetails?.address_components
            ?.filter((item) =>
              item.types.includes("administrative_area_level_2")
            )
            ?.find((address) =>
              townsToSearch.includes((address.long_name ?? "") as TownEnum)
            )?.long_name;

          setTown(town ?? null);
        }
      }
    );
  };

  return (
    <Autocomplete
      disablePortal
      id="google-map-demo"
      options={placePredictions}
      disabled={!consume || !kwhPrice}
      onClick={() => {
        if (!consume || !kwhPrice) alert("¡Campo de entrada habilitado!");
      }}
      onInputChange={(event, value) => {
        getPlacePredictions({ input: value });
      }}
      onChange={(_, value) => onPress(value)}
      sx={{
        "& .MuiInputBase-root": { borderRadius: "10px", height: "100%" },
        "&:disabled": {
          backgroundColor: "red",
        },
        "& .MuiFormControl-root": { height: "100%" },
        "& .MuiFormLabel-root": {
          color: "#185aa6",
          fontWeight: "bold",
        },
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      isOptionEqualToValue={(option) => option.place_id === place?.place_id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Busca una dirección"
          label="Selecciona la ubicación de interés"
          sx={{
            marginInlineEnd: "20px",
            "& .label.MuiInputLabel-root": {
              color: "#000000", // Cambia el color del label a rojo
            },
            "& .MuiFormControl-root": { height: "100%" },
            "& .MuiInputBase-root": { height: "100%" },
            borderBottomWidth: 0,
          }}
        />
      )}
      noOptionsText="Ingresa la dirección"
      loading={isPlacePredictionsLoading}
      style={{
        width: isMobile ? "100%" : "65%",
        height: "80%",
        backgroundColor: "white",
        borderRadius: "10px",
        color: "#000000",
      }}
      className="inputbox"
    />
  );
};

export default InputSearchPlace;
