import React, { useState, useCallback } from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring/three';

import { Text, HTML } from 'drei';
const Ancestor = ({ ancestor, ancestorStore }) => {
  const imgName = ancestor.name.split(' ').join('');
  const imgType = ancestor.img;
  const imgSrc = `${imgName}_${imgType}.jpg`;
  let imgSizeVertical = 1;
  let textOffset = 0.55;

  if (imgType === 1) {
    imgSizeVertical = 1.12;
  } else if (imgType === 2) {
    imgSizeVertical = 1.32;
    textOffset += 0.1;
  } else if (imgType === 3) {
    imgSizeVertical = 1.52;
    textOffset += 0.2;
  } 

  // foto inladen
  const img = new THREE.TextureLoader().load(
    `./assets/img/ancestors/main/${imgSrc}`
  );

  // hover effect
  const [hovered, setHover] = useState(false);
  const states = useSpring({
    scale: hovered ? [1.1, imgSizeVertical*1.1, 1] : [1, imgSizeVertical, 1],
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
        position={[posX - 0.6, textOffset + 0.2, posZ + 0.2]}
        fontSize={0.15}
        color={'white'}
        font={'./assets/fonts/DMSerifDisplay-Regular.ttf'}
      >
        {ancestor.name}
      </Text>
      <Text
        position={[posX - 0.6, textOffset, posZ + 0.2]}
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