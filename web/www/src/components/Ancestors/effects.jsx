/* Voorbeeld van https://codesandbox.io/s/r3f-instanced-colors-8fo01?file=/src/index.js */
/* https://threejs.org/docs/#examples/en/postprocessing/EffectComposer */

import * as THREE from 'three';
import React, { useRef, useEffect, useMemo } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'; 

import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'; /* zelf toegevoegd */

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  SSAOPass,
  UnrealBloomPass,
  BokehPass
});

export default function Effects() {

  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size]);
  
  /* focus, de afstand waar hij op focused, wel exact op dat getal, dichter of verder is blur
   aperture geen idee, 
   maxblur intensiteit van blur */
   const params = useMemo(() => ({ focus: 3.5, aperture: 0.01, maxblur: 0.005 }),[]);

  useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  useFrame(() => composer.current.render(), 2);

  return (
    <effectComposer ref={composer} args={[gl]}>
      {/* Will render our scene with our camera into the first render target. */}
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      {/* ??? */}
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
        renderToScreen
      />

      {/* --------- */}
      {/* schaduw */}
      {/* <sSAOPass
        attachArray="passes"
        args={[scene, camera]}
        kernelRadius={0.6}
        maxDistance={0.03}
      /> */}

      {/* licht en achtergrond */}
      {/* <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0.991]} /> */}

      {/* eigen probeersel */}
      <bokehPass attachArray="passes" args={[scene, camera, params]} />
    </effectComposer>
  );
}
