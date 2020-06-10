import React, { useState } from 'react';
import { useSpring, a } from 'react-spring/three';
import * as THREE from 'three';
import { HTML, Text } from 'drei';
import styles from '../Ancestor/Ancestor.module.css';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../consts';
import { useThree } from 'react-three-fiber';

const Ancestor = ({ancestor}) => {
  // foto inladen
  const img = new THREE.TextureLoader().load('./assets/img/ancestor_george.png');

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

  const {raycaster} = useThree();

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
        >
          1850 - 1940
        </Text>

        <a.mesh
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
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