import { XRSessionMode } from 'iwer/lib/session/XRSession';
import React from 'react';

interface XRButtonProps {
  mode: XRSessionMode;
  store: any;
}

const XRButton = ({ mode, store }: XRButtonProps) => {
  const onEnterXR = () => {
    navigator?.xr?.isSessionSupported(mode).then((supported) => {
      if (supported) {
        store.enterAR();
      } else {
        window.alert(`${mode} is not supported on this device`);
      }
    });
  };

  return (
    <button
      style={{
        bottom: '1em',
        color: 'black',
        padding: '0.5em 1em',
        cursor: 'pointer',
        fontSize: '2em',
      }}
      onClick={onEnterXR}
    >
      {mode === XRSessionMode.ImmersiveVR
        ? 'Enter Immersive VR'
        : 'Enter Immersive AR'}
    </button>
  );
};

export default XRButton;
