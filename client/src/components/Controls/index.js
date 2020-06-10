import * as React from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';

extend({ TrackballControls });

const Controls = ({ }) => {
    const controls = React.useRef();
    const { camera, gl } = useThree();


    // https://discourse.threejs.org/t/how-to-limit-pan-in-orbitcontrols-for-orthographiccamera/9061/15
    var minPan = new THREE.Vector3(-2, -2, -15);
    var maxPan = new THREE.Vector3(2, 2, 50);
    var _v = new THREE.Vector3();

    //  controls.current.addEventListener('change', function () {
    //    alert('Test');
    //    _v.copy(controls.target);
    //    controls.target.clamp(minPan, maxPan);
    //    _v.sub(controls.target);
    //    camera.position.sub(_v);
    //  });

    const handleChangeControls = (controls) => {
      _v.copy(controls.target);
      controls.target.clamp(minPan, maxPan);
      _v.sub(controls.target);
      camera.position.sub(_v);
    };


    useFrame(() => {
      controls.current.update();
      // controls.current.addEventListener('change', handleChangeControls(controls));
    });

    return (
      <trackballControls
        ref={controls}
        args={[camera, gl.domElement]}
        dynamicDampingFactor={0.5}
        zoomSpeed={0.5}

        minDistance={43}
        maxDistance={55}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
          MIDDLE: THREE.MOUSE.ZOOM,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
      />
    );
};

export default Controls;
