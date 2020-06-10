import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; 
import styles from './Map.module.css';
//import { useObserver } from 'mobx-react-lite';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FyZG9lbmxpZW4iLCJhIjoiY2tiODI3Znl4MDAyazJ4cXJ6cWNvdWswcSJ9.aVAGrbiyl5I5yb5KROaD7A';

const Map = () => {
    const mapContainerRef = useRef(null);
    const regionsJson = require('./../../data/region.json');
    const ancestorsJson = require('./../../data/ancestors.json');

      useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/dark-v10',
          center: [13.356, 34.047],
          zoom: 1.5,
          attributionControl: false,
        });
        document.querySelector('.mapboxgl-ctrl-logo').style.display ='none';

        /* ook handig: fitScreenCoordinates > altijd zelfde display van map ongeachte schermgrote - bij mij herhaalde de wereldmap 
        en werd een blob herhaald aan de rechterkant */

        let hoveredRegionId = null;
        map.on("load", function() {
          map.addSource('regions', {
            type: 'geojson',
            data: regionsJson,
          });
            map.setMaxZoom(5);
            map.setMinZoom(1.5);

          map.addLayer({
            id: 'regions-layer',
            type: 'fill',
            source: 'regions',
            paint: {
              'fill-color': 'rgba(200, 100, 240, 0.4)',
              'fill-outline-color': 'rgba(200, 100, 240, 1)',
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'zoom'], false],
                0.2,
                1,
              ],
            },
          });

            // ADD BORDER
            map.addLayer({
                id: "region-borders",
                type: "line",
                source: "regions",
                layout: {},
                paint: {
                "line-color": "rgba(200, 100, 240, 0.8)",
                "line-width": 2,
                "line-opacity": [
                    "case",
                    ["boolean", ["feature-state", "zoom"], false],
                    0.4,
                    1
                ]
                }
            });

            map.addLayer({
                id: "region-info-percentage",
                source: "regions",
                type: "symbol",
                layout: {
                "text-field": ["concat", ["to-string", ["get", "ROOTS_PERCENTAGE"]], "%"],
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                "text-size": 20
                },
                paint: {
                "text-color": "rgba(255,255,255,1)"
                }
            });

            map.addLayer({
                id: "region-info-amount",
                source: "regions",
                type: "symbol",
                layout: {
                "text-field": [
                    "concat",
                    ["to-string", ["get", "NUMBER_ANCESTORS"]],
                    " ancestors"
                ],
                "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
                "text-size": 14,
                "text-offset": [0, 3]
                },
                paint: {
                "text-color": "rgba(255,255,255,1)"
                }
            });

            // ANCESTORS
            ancestorsJson.features.forEach(function (marker) {
              const el = document.createElement('div');
              el.className = 'marker';
              el.style.backgroundImage =
                'url(https://placekitten.com/g/' +
                marker.properties.iconSize.join('/') +
                '/)';
              el.style.width = marker.properties.iconSize[0] + 'px';
              el.style.height = marker.properties.iconSize[1] + 'px';

              el.addEventListener('click', function () {
                window.alert('klik');
              });

              // add marker to map
              new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            });

            // ON CLICK
            /* ook handig, functie fitBounds ipv flyTo (lijkt mij user friendlier voor alle devices + verschillende regio grotes) */
            /* https://docs.mapbox.com/mapbox-gl-js/example/fitbounds/ */
            map.on('click', 'regions-layer', function (e) {
              map.flyTo({
                center: [
                  e.features[0].properties.ZOOMX,
                  e.features[0].properties.ZOOMY,
                ],
                essential: true,
                zoom: 5,
              });
              hoveredRegionId = e.features[0].id;
              map.setFeatureState(
                { source: 'regions', id: hoveredRegionId },
                { zoom: true }
              );
            });

            map.on('zoomend', function () {
              if (map.getZoom() < 4) {
                map.removeFeatureState({
                  source: 'regions',
                });
              }
            });


            var popup = new mapboxgl.Popup({
              closeOnClick: false,
              offset: [0, -15],
            });

            map.on('mouseenter', 'regions-layer', function (e) {
              map.getCanvas().style.cursor = 'pointer';

              if (e.features.length > 0) {
                popup
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.REGION_NAME)
                  .addTo(map);
              }
            });

            map.on('mouseleave', 'regions-layer', function () {
              // Change it back to a pointer when it leaves.
              map.getCanvas().style.cursor = '';
              popup.remove();
            });
        });

        return () => map.remove();
      }, []); 

      return (
        <div className={styles.mapContainer} ref={mapContainerRef} />  
      );
};

export default Map;
