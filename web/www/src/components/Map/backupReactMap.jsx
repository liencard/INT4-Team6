import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import styles from './Map.module.css';
import { useObserver } from 'mobx-react-lite';
import { useStore } from "../../hooks/useStore";

import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl';

import Sidebar from '../Sidebar/index.jsx';
import Marker from '../Ancestor/index.jsx';


const Mapbox = () => {
  const regionsJson = require('../../data/region.json');

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiY2FyZG9lbmxpZW4iLCJhIjoiY2tiODI3Znl4MDAyazJ4cXJ6cWNvdWswcSJ9.aVAGrbiyl5I5yb5KROaD7A',
    attributionControl: false,
    maxZoom: 5,
    minZoom: 1.5
  });

  useEffect(() => {
    document.querySelector('.mapboxgl-ctrl-logo').style.display = 'none';
  })

  return useObserver(() => (
    <>
      <Map
        style="mapbox://styles/mapbox/dark-v10"
        zoom={[1.5]}
        center={[13.356, 34.047]}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <GeoJSONLayer data={regionsJson} />
        <Layer
          type="fill"
          id="regions-layer"
          paint={{
            'fill-color': '#00ffff',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
          }}
        ></Layer>
      </Map>
    </>
  ));
};

export default Mapbox;
