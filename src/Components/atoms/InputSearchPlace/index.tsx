import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

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

  const [place, setPlace] = useState<Place | null>(null);

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
        }
      }
    );
  };

  return (
    <div className="inputSearchPlace">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={placePredictions}
        onInputChange={(event, value) => {
          getPlacePredictions({ input: value });
        }}
        onChange={(_, value) => onPress(value)}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.description}
        isOptionEqualToValue={(option) => option.place_id === place?.place_id}
        renderInput={(params) => (
          <TextField {...params} placeholder="Buscar dirección" />
        )}
        noOptionsText=""
        loading={isPlacePredictionsLoading}
        style={{
          width: "40%",
          position: "relative",
          zIndex: "2",
          backgroundColor: "white",
          left: "2.4%",
        }}
        className="inputbox"
      />
    </div>
  );
};

export default InputSearchPlace;
