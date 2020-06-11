import React, { useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; 
import * as THREE from 'three';
import { useSpring, a } from 'react-spring/three';
import { useFrame, useThree } from 'react-three-fiber';
//import { Text, HTML } from 'drei';
//import styles from '../Ancestor/Ancestor.module.css';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../consts';


const Marker = ({ ancestor}) => {

    console.log(ancestor[3]);

    const el = document.createElement('div');
    el.classList.add('marker');
    el.style.backgroundImage = 'url(./assets/img/loc_male.svg)';

    //el.style.width = marker.properties.iconSize[0] + 'px';
    //el.style.height = marker.properties.iconSize[1] + 'px';

    const mapCoordinates = `[${ancestor.mapLat},${ancestor.mapLong}]`;
    console.log(mapCoordinates);

    console.log('test');

    new mapboxgl.Marker(el)
      .setLngLat(mapCoordinates)
      .addTo(map);

    return useObserver(() => (
        <>
           
        </>
    ));
};

export default Marker;