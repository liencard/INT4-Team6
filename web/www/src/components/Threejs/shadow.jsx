import React from 'react';

const Shadow = () => {
  return (
    <mesh receiveShadow position={[0, -0.01, 20]} rotation-x={-Math.PI / 2} scale={[1.5, 2.5]}>
      <planeBufferGeometry attach="geometry" args={[20, 20, 32, 32]} />
      <shadowMaterial attach="material" />
    </mesh>
  );
};

export default Shadow;
