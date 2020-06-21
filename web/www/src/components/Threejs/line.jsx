import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useUpdate } from 'react-three-fiber';

const Line = ({points}) => {
    const curve = useMemo(
      () => new THREE.CatmullRomCurve3(points.map((v) => new THREE.Vector3(...v))),
      [points]
    );
    const ref = useUpdate(geometry => geometry.setFromPoints(curve.getPoints(50)), [curve])

  return (
    <>
      <line>
        <bufferGeometry attach="geometry" ref={ref} />
        <lineBasicMaterial attach="material" color="white" />
      </line>
    </>
  );
};

export default Line;
