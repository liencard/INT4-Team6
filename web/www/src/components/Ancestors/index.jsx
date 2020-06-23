import React, { useState, useLayoutEffect, useRef} from 'react';
import { Canvas} from 'react-three-fiber';
import Controls from '../Threejs/controls.js';
import Effects from '../Threejs/effects.jsx';
import Lines from '../Threejs/lines.jsx';
import Light from '../Threejs/light.jsx';
import Shadow from '../Threejs/shadow.jsx';

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

  const ancestorGroup = useRef();
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
    console.log(e);
    e.stopPropagation();
    const clickedAncestor = ancestorStore.getAncestorById(e.eventObject.ancestorId);
    setPreview(true);
    setAncestor(clickedAncestor);
  };

  const canvasCreated = (gl) => {
    // gl.setClearColor('#1c1c1c');
    gl.shadowMapType = THREE.PCFSoftShadowMap;
    gl.shadowMap.renderSingleSided = false;
    gl.shadowMap.enabled = true;
    gl.domElement.addEventListener('wheel', () => {
      scrolliconRef.current.classList.add(styles.iconscrollHidden);
    });

    console.log(gl)

    // gl.domElement.addEventListener('touchstart', (e) => {
    //   e.preventDefault();
    //   console.log("test canvas")
    // });

    console.log(ancestorGroup);

    ancestorGroup.current.addEventListener('touchstart', (e) => {
      e.preventDefault();
      console.log('test ancestor');
    });

  }

  const CanvasView = () => {
    return (
      <Canvas
        camera={{ fov: 50, position: [0, 1.5, 25], near: 2, far: 50, focus: 1 }}
        onCreated={({ gl }) => canvasCreated(gl)}
      >
        <Lines />
        <Controls />
        <Light />
        <Effects />
        <Shadow />

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
            ref={ancestorGroup}

            // touchscreen devices
            onTouchEnd={(e) => console.log('touch end ')}
           
            onMouseDown={(e) => console.log('mouse down')}

            onClick={(e) => handleClickAncestor(e)} // works for desktop
          >
            <Ancestor ancestor={ancestor} ancestorStore={ancestorStore} />
          </group>
        ))}
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
        className={`${styles.iconscroll} ${
          canvas ? '' : styles.iconscrollHidden
        }`}
      >
        <img
          className={styles.icon}
          src="/assets/img/icon_scroll.svg"
          alt="Death"
          width="40px"
          height="40px"
        />
        scroll
      </div>

      <div className={styles.canvas__container}>
        {canvas ? canvas : <Loader />}
      </div>
    </>
  ); 

};

export default Ancestors;