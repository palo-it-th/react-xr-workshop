import { useEffect, useState } from 'react';
import { XRSessionMode } from 'iwer/lib/session/XRSession';

const PROGRESS_INTERVAL = 50; // Interval for progress update in milliseconds
const PROGRESS_INCREMENT = 3; // Increment value for each progress update
const PROGRESS_MAX = 100;

interface XRSessionHookProps {
  store: any;
  delayLoading?: number;
}

const useXRSession = (props: XRSessionHookProps) => {
  const { store } = props;

  // There is some bugs that state mode value is not match with session object.
  // So, we store the session mode here.
  const [sessionMode, setSessionMode] = useState<XRSessionMode | null>(null);

  const [tempSessionMode, setTempSessionMode] = useState<XRSessionMode | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressTimeout: NodeJS.Timeout;
    if (isLoading) {
      const updateProgress = () => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + PROGRESS_INCREMENT;
          if (newProgress >= PROGRESS_MAX) {
            clearTimeout(progressTimeout);
            return PROGRESS_MAX;
          }
          return newProgress;
        });
      };
      progressTimeout = setTimeout(updateProgress, PROGRESS_INTERVAL);
    }

    return () => clearTimeout(progressTimeout);
  }, [isLoading, progress]);

  useEffect(() => {
    if (sessionMode === null) {
      setIsLoading(false);
      setProgress(0);
    }
  }, [sessionMode]);

  useEffect(() => {
    if (progress === PROGRESS_MAX && isLoading && tempSessionMode !== null) {
      setIsLoading(false);
      if (tempSessionMode === XRSessionMode.ImmersiveAR) {
        store.enterAR();
      } else {
        store.enterVR();
      }
      setSessionMode(tempSessionMode);
      setTempSessionMode(null);
    }
  }, [isLoading, progress, tempSessionMode]);

  const setStateChange = (mode: XRSessionMode) => {
    setIsLoading(true);
    setTempSessionMode(mode);
  };

  const onXRRequestChangeMode = (mode: XRSessionMode) => {
    navigator?.xr?.isSessionSupported(mode!).then((supported) => {
      if (supported) {
        setStateChange(mode);
      } else {
        window.alert(`${mode} is not supported on this device`);
      }
    });
  };

  const onXRRequestReset = () => {
    setSessionMode(null);
    setTempSessionMode(null);
  };

  return {
    sessionMode,
    isLoading,
    progress,
    onXRRequestChangeMode,
    onXRRequestReset,
  };
};

export { useXRSession };
