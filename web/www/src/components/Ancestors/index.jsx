import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, forwardRef} from 'react';
import { Canvas, createPortal } from 'react-three-fiber';
import Controls from '../Controls';
import Effects from './effects.jsx';
import Line from './line.jsx';
import Ancestor from '../Ancestor/index.jsx';
import Sidebar from '../Sidebar/index.jsx';

import Loader from '../Loader/index.jsx';

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import styles from './Ancestors.module.css';
import { observe } from 'mobx';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber'

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
    gl.shadowMap.renderSingleSided = false;
    gl.shadowMap.enabled = true;
    gl.domElement.addEventListener('wheel', () => {
      scrolliconRef.current.classList.add(styles.iconscrollHidden);
      console.log(scrolliconRef.current);
      // setScrollicon(false);
    });
  }

  const Light = () => {
     const light = new THREE.DirectionalLight(0xffffff, .2, 100);
     light.position.set(0, 50, 30);
     light.castShadow = true;
     light.shadow.radius = 15;
     light.shadow.mapSize.width = 8000; // default
     light.shadow.mapSize.height = 8000; // default
     light.shadow.camera.near = 0.1; // default
     light.shadow.camera.far = 500; // default
     light.shadow.camera.top = -100; // default
     light.shadow.camera.right = 100; // default
     light.shadow.camera.left = -100; // default
     light.shadow.camera.bottom = 100; // default
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
          fov: 70,
          position: [0, 0, 25],
          near: 0.1,
          far: 500,
        }}
        onCreated={({ gl }) => canvasCreated(gl)}
      >
        {/* links voorouder 1, middenste coördinate uit array is optioneel voor een curve, rechts voorouder 2 */}
        <Line
          points={[
            [0, -1, 60],
            [-0.7, -1, 59.5],
            [-2, -1, 57],
          ]}
        />
        <Line
          points={[
            [0, -1, 60],
            [0.7, -1, 59.5],
            [2, -1, 57],
          ]}
        />

        <mesh
          receiveShadow
          position={[0, -1.01, 20]}
          rotation-x={-Math.PI / 2}
          scale={[1.5,2.5]}
        >
          <planeBufferGeometry attach="geometry" args={[20, 20, 32, 32]} />
          <shadowMaterial attach="material" />
        </mesh>

        <Controls />
        <Light />
        {ancestors.map((ancestor) => (
          <group
            key={ancestor.id}
            ancestorId={ancestor.id}
            onClick={(e) => handleClickAncestor(e)}
          >
            <Ancestor ancestor={ancestor} ancestorStore={ancestorStore} />
          </group>
        ))}
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