import React, { useState, useEffect, useLayoutEffect, useRef, useMemo} from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '../Controls';
import Effects from './effects.jsx';
import Ancestor from '../Ancestor/index.jsx';
import Sidebar from '../Sidebar/index.jsx';

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import styles from './Ancestors.module.css';
import { observe } from 'mobx';
import * as THREE from 'three';

const Ancestors = () => {
const { ancestorStore } = useStore();
const [preview, setPreview] = useState(false);
const [ancestor, setAncestor] = useState(null);
const [canvas, setCanvas] = useState(false);

const stopObserve = observe(ancestorStore, (change) => {
  if (change.name === 'loadAllComplete') {
    setCanvas(<CanvasView />);
  }
});
let ancestors = ancestorStore.ancestors;

  const handleClickAncestor = (e) => {
    e.stopPropagation();
    const clickedAncestor = ancestorStore.getAncestorById(e.eventObject.ancestorId);

    setPreview(true);
    setAncestor(clickedAncestor);
  };

  var curve = new THREE.CubicBezierCurve(
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(-5, 15),
    new THREE.Vector2(20, 15),
    new THREE.Vector2(10, 0)
  );

  /* divisions -- number of pieces to divide the curve into. Default is 5. */
  var points = curve.getPoints(50);

  const CanvasView = () => {
    return (
      <Canvas
        camera={{
          fov: 70,
          position: [0, 0, 63],
          near: 0.1,
          far: 500,
        }}
        onCreated={({ gl }) => gl.setClearColor('#1c1c1c')}
      >
        <Controls />
        <ambientLight color="#ffffff" intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
{/* 
        <line visible position={[1, 2, 3]}>
          <bufferGeometry attach="geometry" setFromPoints={points} />
          <lineBasicMaterial color="0xff0000" />
        </line> */}

        {ancestors.map((ancestor) => (
          <group
            key={ancestor.id}
            ancestorId={ancestor.id}
            onClick={(e) => handleClickAncestor(e)}
          >
            <Ancestor ancestor={ancestor} ancestorStore={ancestorStore} />
          </group>
        ))}
        {/* <Effects /> */}
      </Canvas>
    );
  };




   useLayoutEffect(() => {
     if (ancestorStore.loadAllComplete && !canvas) {
        setCanvas(<CanvasView />);
     }
   }, [canvas, ancestors]);


  return  (
    <>
      <Sidebar
        type={'preview'}
        content={ancestor}
        toggle={preview}
        setToggle={setPreview}
      />

      <div className={styles.canvas__container}>
        {canvas}
      </div>
    </>
  );

};

export default Ancestors;