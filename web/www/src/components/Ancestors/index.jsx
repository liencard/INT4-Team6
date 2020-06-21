import React, { useState, useLayoutEffect, useRef} from 'react';
import { Canvas} from 'react-three-fiber';
import Controls from '../Controls/index.js';
import Effects from './effects.jsx';
import Line from './line.jsx';
import Ancestor from '../Ancestor/index.jsx';
import Sidebar from '../Sidebar/index.jsx';

import Loader from '../Loader/index.jsx';

import { useStore } from "../../hooks/useStore";
import styles from './Ancestors.module.css';
import { observe } from 'mobx';
import * as THREE from 'three';

const Ancestors = () => {
  const { ancestorStore } = useStore();
  const [preview, setPreview] = useState(false);
  const [ancestor, setAncestor] = useState(null);
  const [canvas, setCanvas] = useState(false);
  let ancestors = ancestorStore.ancestors;

  const scrolliconRef = useRef();

  /* eerste keer site inladen */
  const stopObserve = observe(ancestorStore, (change) => {
    if (change.name === 'loadAllComplete') {
      setCanvas(<CanvasView />);
    }
  });

  /* wordt ook opgeroepen indien je komt vanuit ander component */
  useLayoutEffect(() => {
    if (ancestorStore.loadAllComplete && !canvas) {
      setCanvas(<CanvasView />);
    }
  }, [canvas, ancestors]);

  const handleClickAncestor = (e) => {
    e.stopPropagation();
    const clickedAncestor = ancestorStore.getAncestorById(e.eventObject.ancestorId);
    setPreview(true);
    setAncestor(clickedAncestor);
  };

  const canvasCreated = (gl) => {
    gl.setClearColor('#1c1c1c');
    gl.shadowMapType = THREE.PCFSoftShadowMap;
    gl.shadowMap.renderSingleSided = false;
    gl.shadowMap.enabled = true;
    gl.domElement.addEventListener('wheel', () => {
      scrolliconRef.current.classList.add(styles.iconscrollHidden);
    });
  }

  const Light = () => {
     const light = new THREE.DirectionalLight(0xffffff, 1, 100);
     light.position.set(0, 50, 12);
     light.castShadow = true;
     light.shadow.radius = 8; // blur
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
  }

  const CanvasView = () => {
    return (
      <Canvas
        camera={{
          fov: 50,
          position: [0, 1.5, 25],
          near: 2,
          far: 50,
          focus: 1
        }}
        onCreated={({ gl }) => canvasCreated(gl)}
      >

        {/* GEORGE */}
        <Line points={[[0, 0, 21], [-1.5, 0, 20], [-2, 0, 18]]} />
          <Line points={[[-2, 0, 18], [-4.2, 0, 16.5], [-5, 0, 15]]} /> {/* to benjamin */ }
            <Line points={[[-5, 0, 15], [-8, 0, 13.5], [-9, 0, 12]]} /> {/* to gabriel */}
              <Line points={[[-9, 0, 12], [-9.9, 0, 10.5], [-10, 0, 9]]} /> {/* to raymond */ }
                <Line points={[[-10, 0, 9], [-10.9, 0, 7.5], [-11, 0, 6]]} /> {/* to henry */}
                  <Line points={[[-11, 0, 6], [-11.9, 0, 4.5], [-12, 0, 3]]} /> {/* to marcus */}
                  <Line points={[[-11, 0, 6], [-10.1, 0, 4.5], [-10, 0, 3]]} /> {/* to mary */}
              <Line points={[[-9, 0, 12], [-8.1, 0, 10.5], [-8, 0, 9]]} /> {/* to amanda */ }
            <Line points={[[-5, 0, 15], [-5.2, 0, 13.5], [-7, 0, 12]]} /> {/* to lisa */}
          <Line points={[[-2, 0, 18], [-2.1, 0, 16.5], [-3, 0, 15]]} /> {/* to camille */ }
            <Line points={[[-3, 0, 15], [-3.45, 0, 13.5], [-3.5, 0, 12]]} /> {/* to jacob */}
            <Line points={[[-3, 0, 15], [-1.7, 0, 13.5], [-1.5, 0, 12]]} /> {/* to elisa */}

        {/* ELIZABETH */}
        <Line points={[[0, 0, 21], [1.5, 0, 20], [2, 0, 18]]} />
          <Line points={[[2, 0, 18], [2.1, 0, 16.5], [3, 0, 15]]} /> {/* to frederic */}
            <Line points={[[3, 0, 15], [1.7, 0, 13.5], [1.5, 0, 12]]} /> {/* to steve */}
            <Line points={[[3, 0, 15], [3.45, 0, 13.5], [3.5, 0, 12]]} /> {/* to sara */}
          <Line points={[[2, 0, 18], [4.2, 0, 16.5], [5, 0, 15]]} /> {/* to mathilde */}
            <Line points={[[5, 0, 15], [5.2, 0, 13.5], [7, 0, 12]]} /> {/* to jacob */}
              <Line points={[[7, 0, 12], [6.1, 0, 10.5], [6, 0, 9]]} /> {/* to samuel */}
                <Line points={[[6, 0, 9], [5.1, 0, 7.5], [5, 0, 6]]} /> {/* to richard */}
                  <Line points={[[5, 0, 6], [4.1, 0, 4.5], [4, 0, 3]]} /> {/* to steven */}
                  <Line points={[[5, 0, 6], [5.9, 0, 4.5], [6, 0, 3]]} /> { /* to alice */}
                <Line points={[[6, 0, 9], [6.9, 0, 7.5], [7, 0, 6]]} /> {/* to margaret */}
                  <Line points={[[7, 0, 6], [8.8, 0, 4.5], [9, 0, 3]]} /> {/* to james */}
              <Line points={[[7, 0, 12], [7.9, 0, 10.5], [8, 0, 9]]} /> {/* to elizabeth */}
            <Line points={[[5, 0, 15], [8, 0, 13.5], [9, 0, 12]]} /> {/* to patricia */}
              <Line points={[[9, 0, 12], [10.5, 0, 10.5], [11, 0, 9]]} /> {/* to william */}

        <mesh
          receiveShadow
          position={[0, -.01, 20]}
          rotation-x={-Math.PI / 2}
          scale={[1.5, 2.5]}
        >
          <planeBufferGeometry attach="geometry" args={[20, 20, 32, 32]} />
          <shadowMaterial attach="material" />
        </mesh>

        <Controls />
        <Light />
        <mesh
          scale={[0.01, 0.01, 0.01]}
          rotation-x={-Math.PI / 2}
          position={new THREE.Vector3(0, 0, 21)}
        >
          <circleGeometry attach="geometry" args={[5, 32]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
        {ancestors.map((ancestor) => (
          <group
            key={ancestor.id}
            ancestorId={ancestor.id}
            onClick={(e) => handleClickAncestor(e)}
          >
            <Ancestor ancestor={ancestor} ancestorStore={ancestorStore} />
          </group>
        ))}
         <Effects />
         <fog attach="fog" args={['#1c1c1c', 4, 25]} />
      </Canvas>
    );
  };

  return (
    <>
      <Sidebar
        type={'preview'}
        content={ancestor}
        toggle={preview}
        setToggle={setPreview}
      />
      <div
        ref={scrolliconRef}
        className={canvas ? styles.iconscroll : ''}
      />
      <div className={styles.canvas__container}>
        {canvas ? canvas : <Loader />}
      </div>
    </>
  );

};

export default Ancestors;