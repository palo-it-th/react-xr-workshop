import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh, Object3D, Object3DEventMap, Vector3 } from "three";


enum MovingState {
    MovingRight,
    MovingLeft,
}
  
const useTestTransition = () => {
  const refObject = useRef<Object3D<Object3DEventMap>|Mesh | null>(null);
  const refState = useRef<MovingState>(MovingState.MovingRight);

  useFrame((_, delta) => {
    if (refObject.current !== null) {
      const position = refObject.current.position;
      switch (refState.current) {
        case MovingState.MovingRight:
          position.x += delta;
          if (position.x >= 2) {
            refState.current = MovingState.MovingLeft;
          }
          break;
        case MovingState.MovingLeft:
          position.x -= delta;
          if (position.x <= -2) {
            refState.current = MovingState.MovingRight;
          }
          break;
        default:
          break;
      }
    }
  });
  return { refObject };
}

export default useTestTransition;