import React, { useState, useCallback } from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring/three';
import { useFrame, useThree } from 'react-three-fiber';
// import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'; 
// bvh deleten uit package.json indien niet gebruiken voor id op te halen raycaster

import { Text } from 'drei';
import styles from '../Ancestor/Ancestor.module.css';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../consts';


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



  const mesh = React.useRef();

  // enkel eerste item onder muis = intersects[0] ?
  // const { raycaster, scene, intersect } = useThree();
  // console.log(intersect());

  // let intersectedObjects = [];
  // intersectedObjects = raycaster.intersectObjects(scene.children);

  // alle uuid
  // if (mesh.current) {
  //     console.log(mesh.current.uuid);
  // }

  // console.log(intersect)
  // useFrame(() => {
  //   intersect = raycaster.intersectObject(scene.children);
  //   if (intersect) {
  //     console.log(intersect);
  //   }
  // });

  // three-mesh-bvh probeersel
  // raycaster.firstHitOnly = true;
  // let intersect = raycaster.intersectObjects(scene.children);

  // window.addEventListener('mousemove', onMouseMove, false);
  // function onMouseMove( event ) {
  //   // console.log("test")
  // }

  const toggleHover = useCallback((e, value) => {
      e.stopPropagation(); /// !!!!
      setHover(value)
  });

  const handleClickAncestor = (e) => {
    e.stopPropagation(); /// !!!!
    console.log(e.eventObject.uuid); // findId in store op basis van deze id? uuid is wel random TO CHECK, uniek id meegeven als prop?
  };

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
        ref={mesh} // mag weg later
        onPointerOver={(e) => toggleHover(e, true)}
        onPointerOut={(e) => toggleHover(e, false)}
        onClick={(e) => handleClickAncestor(e)}
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