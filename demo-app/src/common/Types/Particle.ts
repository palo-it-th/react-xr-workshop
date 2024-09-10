import { Vector3 } from "three";

export default interface ParticleProps {
    enable?: boolean;
    scale?: Vector3;
    position?: Vector3;
    rotation?: Vector3;
}