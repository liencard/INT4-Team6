import React, { useState, useCallback } from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring/three';

import { Text, HTML } from 'drei';
const Ancestor = ({ ancestor, ancestorStore }) => {
  // foto inladen
  const img = new THREE.TextureLoader().load(
    './assets/img/test1.jpg'
  );

  // hover effect
  const [hovered, setHover] = useState(false);
  const states = useSpring({
    scale: hovered ? [1.1, 1.1, 1] : [1, 1, 1],
  });
  
  // coordinaten ophalen
  let coordinates = ancestor.coordinates.split(',');

  let position = coordinates.map((coordinate) =>
    parseInt(coordinate) ? parseInt(coordinate) : coordinate
  );
  let posX = position[0];
  let posY = position[1];
  let posZ = position[2];

  const dates = `${ancestor.birthdate} - ${ancestor.deathdate}`;

  const toggleHover = useCallback((e, value) => {
    e.stopPropagation();
    setHover(value); // flicker bug
  }); 

  return (
    <>
      <Text
        position={[posX - 0.6, posY + 0.7, posZ + 0.2]}
        fontSize={0.15}
        color={'white'}
        font={'./assets/fonts/DMSerifDisplay-Regular.ttf'}
      >
        {ancestor.name}
      </Text>
      <Text
        position={[posX - 0.6, posY + 0.5, posZ + 0.2]}
        fontSize={0.1}
        color={'white'}
        font={'./assets/fonts/DMSerifDisplay-Regular.ttf'}
      >
        {dates}
      </Text>

      <a.mesh
        ancestorId={ancestor.id}
        onPointerOver={(e) => toggleHover(e, true)}
        onPointerOut={(e) => toggleHover(e, false)}
        scale={states.scale}
        position={[posX, posY, posZ]}
      >
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshBasicMaterial attach="material" map={img} transparent={true} />
      </a.mesh>
    </>
  );
};

export default Ancestor;