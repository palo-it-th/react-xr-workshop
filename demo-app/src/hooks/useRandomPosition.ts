import * as THREE from 'three';

const X_RANGE = { min: -15, max: 15 };
const Y_RANGE = { min: 0, max: 10 };
const Z_RANGE = { min: -10, max: -10 };

interface RandomScope {
  x: { min: number; max: number };
  y: { min: number; max: number };
  z: { min: number; max: number };
}

interface RandomPositionProps {
  scope?: RandomScope;
  objectSize?: number;
  usedPositions: THREE.Vector3[];
}

export const useRandomPosition = (props: RandomPositionProps) => {
  const xRangePositions = props.scope?.x || X_RANGE;
  const yRangePositions = props.scope?.y || Y_RANGE;
  const zRangePositions = props.scope?.z || Z_RANGE;

  const getPosition = (min: number, max: number): number => {
    return THREE.MathUtils.randFloat(min, max);
  };

  const isPositionOccupied = (x: number, y: number): boolean => {
    const range = props.objectSize || 1;
    const isUsed = props.usedPositions.some(
      (pos) => Math.abs(pos.x - x) <= range && Math.abs(pos.y - y) <= range,
    );
    return isUsed;
  };

  const randomPositionVector3 = (): THREE.Vector3 => {
    let newX, newY, newZ;
    do {
      newX = getPosition(xRangePositions.min, xRangePositions.max);
      newY = getPosition(yRangePositions.min, yRangePositions.max);
      newZ = getPosition(zRangePositions.min, zRangePositions.max);
    } while (isPositionOccupied(newX, newY));
    return new THREE.Vector3(newX, newY, newZ);
  };

  return { randomPositionVector3 };
};
