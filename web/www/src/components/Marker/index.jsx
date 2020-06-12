import React, { useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; 
import { useObserver } from 'mobx-react-lite';
import styles from './../Map/Map.module.css';

const Marker = (ancestor) => {

    // const el = document.createElement('div');
    // el.classList.add('markerr');
    // el.style.backgroundImage = 'url(./assets/img/loc_male.svg)';
    // el.style.width = '34px';
    // el.style.height = '38px';
    // let mapCoordinates = [];
    // let mapLat = `${ancestor.mapLat}`;
    // let mapLong = `${ancestor.mapLong}`;
    // mapCoordinates.push(parseFloat(mapLong));
    // mapCoordinates.push(parseFloat(mapLat));
    // new mapboxgl.Marker(el)
    //   .setLngLat(mapCoordinates)
    //   .addTo(map);

    // el.addEventListener('click', function () {
    //    window.alert('klik');
    // });

    //console.log(mapCoordinates);

    console.log('hallo');


    return useObserver(() => (
        <>
            <div className={styles.marker}><p>hallo</p></div>
        </>
    ));
};

export default Marker;