import React, { useState, useEffect, useLayoutEffect, useRef} from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '../Controls';
import Ancestor from '../Ancestor/index.jsx';
import Sidebar from '../Sidebar/index.jsx';

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import styles from './Ancestors.module.css';
import { observe } from 'mobx';


const Ancestors = () => {
const { ancestorStore } = useStore();
const [preview, setPreview] = useState(false);
const [ancestor, setAncestor] = useState(null);
const [state, setState] = useState("loading");
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

  const CanvasView = () => {
    return (
      <Canvas
        camera={{
          fov: 70,
          position: [0, 0, 63],
          near: 0.1,
          far: 500,
        }}
      >
        <Controls />
        <ambientLight color="#ffffff" intensity={0.1} />
        <pointLight position={[10, 10, 10]} />

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