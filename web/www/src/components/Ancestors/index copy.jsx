import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '../Controls';
import Ancestor from '../Ancestor/index.jsx';
import Sidebar from '../Sidebar/index.jsx';
import CanvasTest from './canvas.jsx';

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import styles from './Ancestors.module.css';


const Ancestors = () => {
const { ancestorStore } = useStore();
const STATE_LOADING = 'loading';
const STATE_DOES_NOT_EXIST = 'doesNotExist';
const STATE_FULLY_LOADED = 'fullyLoaded';
const STATE_LOADING_MORE_DETAILS = 'loadingMoreDetails';

const [preview, setPreview] = useState(false);
const [ancestors, setAncestors] = useState(null);
const [ancestor, setAncestor] = useState(null);
const [canvas, setCanvas] = useState(null);
const [state, setState] = useState(
  ancestors ? STATE_LOADING_MORE_DETAILS : STATE_LOADING
);

// const [canvas, setCanvas] = useState("start");

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

        {ancestorStore.ancestors.map((ancestor) => (
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



  

   useEffect(() => {
     const loadAncestors = async (ancestorStore) => {
       try {
         const ancestorsFromStore = await ancestorStore.ancestors;
         if (!ancestorsFromStore) {
           setState(STATE_DOES_NOT_EXIST);
           return;
         }
         setAncestors(ancestorsFromStore);
         setCanvas(CanvasView());
         setState(STATE_FULLY_LOADED);
       } catch (error) {
         /*if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }*/
       }
     };
     loadAncestors(ancestorStore);

     //  setCanvas(CanvasView());
   }, [ancestors, ancestor, ancestorStore]);



   
  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return "No ancestors"
    }
    if (state === STATE_LOADING) {
      return "Loading";
    }
        
   return( 
     <>
      <Sidebar
        type={'preview'}
        content={ancestor}
        toggle={preview}
        setToggle={setPreview}
      />
      {/* <CanvasView /> */}
      {/* <CanvasTest /> */}

      <div className={styles.canvas__container}>{canvas}</div>
      </>
   )
  });

};

export default Ancestors;


   {
     /* useobserver weghalen, usestate & useobserver proberen te splitsen
     canvas aparte component maken, ancestorstore binnenhalen en useobserver weghalen */
   }