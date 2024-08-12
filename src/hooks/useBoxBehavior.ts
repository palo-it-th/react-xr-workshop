import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three/src/Three';

enum BoxState {
  MovingRight,
  MovingLeft,
}

const useBoxBehavior = () => {
  const refBox = useRef<Mesh>(null!);
  const refBoxState = useRef<BoxState>(BoxState.MovingRight);

  useFrame((state, delta) => {
    if (refBox.current !== null) {
      refBox.current.rotation.x += delta;
      refBox.current.rotation.y -= delta;

      const position = refBox.current.position;
      switch (refBoxState.current) {
        case BoxState.MovingRight:
          position.x += delta;
          if (position.x >= 2) {
            refBoxState.current = BoxState.MovingLeft;
          }
          break;
        case BoxState.MovingLeft:
          position.x -= delta;
          if (position.x <= -2) {
            refBoxState.current = BoxState.MovingRight;
          }
          break;
        default:
          break;
      }
    }
  });

  return { refBox };
};

export default useBoxBehavior;
