import React, { useState, useCallback } from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring/three';
//import { useObserver } from 'mobx-react-lite';

import { Text } from 'drei';
const Ancestor = ({ ancestor, ancestorStore }) => {
  const imgName = ancestor.name.split(' ').join('');
  const imgType = ancestor.img;
  const imgSrc = `${imgName}`;
  let imgSizeVertical = 1;
  let textOffset = 1.55;

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
  const imgMain = new THREE.TextureLoader().load(
    `./assets/img/ancestors/main/${imgSrc}.jpg`
  );

  const imgFiles = new THREE.TextureLoader().load(
    `./assets/img/ancestors/files/${imgSrc}.png`
  );

  //hover effect
  const [hovered, setHover] = useState(false);
  const states = useSpring({
    scale: hovered ? [1.1, imgSizeVertical*1.1, 1] : [1, imgSizeVertical, 1],
  });
  
  // coordinaten ophalen
  let coordinates = ancestor.coordinates.split(',');

  let position = coordinates.map((coordinate) =>
    parseFloat(coordinate) ? parseFloat(coordinate) : coordinate
  );
  
  let posX = position[0];
  let posY = position[1] + 1;
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
        font={'./assets/fonts/DMSerifDisplay/DMSerifDisplay-Regular.ttf'}
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

      <a.mesh position={[posX, posY - 0.2, posZ + 0.2]}>
        <planeGeometry attach="geometry" args={[1.58, 1.15]} />
        <a.meshBasicMaterial
          attach="material"
          map={imgFiles}
          transparent={true}
        />
      </a.mesh>

      <a.mesh
        castShadow
        ancestorId={ancestor.id}
        onPointerOver={(e) => toggleHover(e, true)}
        onPointerLeave={(e) => toggleHover(e, false)}
        scale={states.scale}
        position={[posX, posY, posZ]}
      >
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshBasicMaterial
          attach="material"
          map={imgMain}
          transparent={true}
          fog={true}
        />
      </a.mesh>

      <mesh
        scale={[0.01, 0.01, 0.01]}
        rotation-x={-Math.PI / 2}
        position={new THREE.Vector3(posX, posY - 1, posZ)}
      >
        <circleGeometry attach="geometry" args={[5, 32]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
    </>
  );
};

export default Ancestor;