import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { useObserver } from 'mobx-react-lite';
import Controls from '../Controls';
import Ancestor from '../Ancestor/index.jsx';
import { useStore } from '../../hooks/useStore';

const CanvasTest = () => {
    const { ancestorStore } = useStore();
    const [preview, setPreview] = useState(false);
    const [ancestor, setAncestor] = useState(null);

    let ancestors = ancestorStore.ancestors;

    const handleClickAncestor = (e) => {
      e.stopPropagation();
      const clickedAncestor = ancestorStore.getAncestorById(
        e.eventObject.ancestorId
      );

      setPreview(true);
      setAncestor(clickedAncestor);
    };
    
    return useObserver(() =>(
      <>
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
      </>
    )); 
};

export default CanvasTest;
