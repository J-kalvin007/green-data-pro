import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type MapPickerProps = {
  onSelectLocation: (lat: number, lng: number) => void;
};

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 6.1319, // Exemple : Lomé
  lng: 1.2220,
};

const CarteGoogle: React.FC<MapPickerProps> = ({ onSelectLocation }) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onSelectLocation(lat, lng);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBOVIt5xEz_MT5Vtd_p3XfToqUjTEBZxXE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default CarteGoogle;





















