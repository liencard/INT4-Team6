import React, { useState} from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '../Controls';
import Ancestor from '../Ancestor/index.jsx';
import Sidebar from '../Sidebar/index.jsx';

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Ancestors = () => {
const { ancestorStore } = useStore();
//const ancestors = ancestorStore.ancestors;

const [preview, setPreview] = useState(false);
const [ancestor, setAncestor] = useState(null);

  const handleClickAncestor = (e) => {
    e.stopPropagation();
    const clickedAncestor = ancestorStore.getAncestorById(e.eventObject.ancestorId);

    setPreview(true);
    setAncestor(clickedAncestor);
  };

  return useObserver(() => (
    <>
      <Sidebar type={"preview"} content={ancestor} toggle={preview} setToggle={setPreview} />
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
    </>
  ));
};

export default Ancestors;