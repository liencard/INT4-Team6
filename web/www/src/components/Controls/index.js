import * as React from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';

extend({ TrackballControls });

const Controls = ({ }) => {
    const controls = React.useRef();
    const { camera, gl } = useThree();

    var minPan = new THREE.Vector3(-11, 0, 0);
    var maxPan = new THREE.Vector3(11, 7, 0);
    var pan = new THREE.Vector3();

    useFrame(() => {
      controls.current.update();
      pan.copy(controls.current.target);
      controls.current.target.clamp(minPan, maxPan);
      pan.sub(controls.current.target);
      camera.position.sub(pan);
    });

    return (
      <trackballControls
        ref={controls}
        args={[camera, gl.domElement]}
        dynamicDampingFactor={0.5}
        zoomSpeed={0.5}
        minDistance={0}
        maxDistance={25}

        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.ZOOM,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
      />
    );
};

export default Controls;
