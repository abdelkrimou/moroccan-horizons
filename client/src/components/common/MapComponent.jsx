import React, { useState, useRef, useMemo } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LngLatBounds } from "mapbox-gl";

function MapComponent({ coordinates }) {
  const [viewport, setViewport] = useState({
    longitude: -98.35,
    latitude: 39.5,
    zoom: 2.6,
  });

  const markerData = useMemo(() => coordinates, [coordinates]);

  const mapRef = useRef(null);

  const markers = useMemo(() => markerData, [markerData]);

  const handleMapLoad = () => {
    const bounds = new LngLatBounds();

    markers.forEach((marker) => {
      bounds.extend([marker.longitude, marker.latitude]);
    });

    // Ensure mapRef.current is not null before calling fitBounds
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds, {
        padding: 50,
        duration: 1000,
        maxZoom: 6,
      });
    }
  };

  return (
    <Map
      {...viewport}
      ref={mapRef}
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/karimou97/clznou5vx006401pze73mgkfh"
      mapboxAccessToken={`${import.meta.env.VITE_MAPBOX_TOKEN}`}
      onMove={(evt) => setViewport(evt.viewState)}
      scrollZoom={false}
      onLoad={handleMapLoad} // Ensure map is loaded before fitting bounds
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          longitude={marker.longitude}
          latitude={marker.latitude}
        />
      ))}
    </Map>
  );
}

export default MapComponent;
