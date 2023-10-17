import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import usePlacesAutocompleteService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { TownEnum } from "../RateResults";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

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

const InputSearchPlace = ({ onSelectPlace }: Props) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey,
  });
  const townsToSearch = [
    TownEnum.Barranquilla,
    TownEnum.Galapa,
    TownEnum.PuertoColombia,
    TownEnum.Soledad,
  ];

  const [place, setPlace] = useState<Place | null>(null);
  const [found, setFound] = useState<boolean>(false);
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
          const formattedAdress = placeDetails?.formatted_address?.split(",");
          if (formattedAdress) {
            for (let i = 0; i < formattedAdress.length; i++) {
              if (townsToSearch.includes(formattedAdress[i])) {
                setFound(true);
                console.log(
                  `Se encontró ${formattedAdress[i]} en la dirección.`
                );
                break;
              }
              s;
            }
          }

          console.log(formattedAdress);
        }
      }
    );
  };

  return (
    <div className="inputSearchPlace">
      <Autocomplete
        disablePortal
        id="google-map-demo"
        options={placePredictions}
        onInputChange={(event, value) => {
          getPlacePredictions({ input: value });
        }}
        onChange={(_, value) => onPress(value)}
        sx={{
          width: 300,
          "& .MuiInputBase-root": { borderRadius: "30px" },
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
              "& label.MuiInputLabel-root": {
                color: "#ED411A", // Cambia el color del label a rojo
              },
            }}
          />
        )}
        noOptionsText="Ingresa la dirección"
        loading={isPlacePredictionsLoading}
        style={{
          width: "40%",
          position: "absolute",
          zIndex: "2",
          backgroundColor: "white",
          left: "50%",
          borderRadius: "30px",
          color: "#ED411A",
          top: "28%",
        }}
        className="inputbox"
      />
    </div>
  );
};

export default InputSearchPlace;
