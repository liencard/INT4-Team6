import React from 'react';
import * as THREE from 'three';

const Light = () => {
  const light = new THREE.DirectionalLight(0xffffff, 1, 100);
  light.position.set(0, 50, 12);
  light.castShadow = true;
  light.shadow.radius = 8;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 512;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;
  light.shadow.camera.top = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.left = -100;
  light.shadow.camera.bottom = 100;
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.1} />
      <primitive object={light} />
    </>
  );
};

export default Light;
