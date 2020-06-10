import React from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '../Controls';
import Ancestor from '../Ancestor/index.jsx';

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Ancestors = () => {
const { ancestorStore } = useStore();
const ancestors = ancestorStore.ancestors;

  return useObserver(() => (
    <>
      <Canvas
        camera={{
          fov: 50,
          position: [0, 0, 53],
          near: 0.1,
          far: 500,
        }}
      >
        <Controls />
        <ambientLight color="#ffffff" intensity={0.1} />
        <pointLight position={[10, 10, 10]} />

        {ancestorStore.ancestors.map((ancestor) => (
          <Ancestor key={ancestor.id} ancestor={ancestor} />
        ))}
      </Canvas>
    </>
  ));
};

export default Ancestors;