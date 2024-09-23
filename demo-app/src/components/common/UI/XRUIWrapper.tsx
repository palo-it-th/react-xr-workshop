import React from 'react';
import * as THREE from 'three';

const XRUIWrapper = React.forwardRef<THREE.Mesh, JSX.IntrinsicElements['mesh']>(
  (props, ref) => {
    return (
      <mesh ref={ref} {...props}>
        {props.children}
      </mesh>
    );
  },
);

export default XRUIWrapper;
