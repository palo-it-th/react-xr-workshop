import * as THREE from 'three';

// Distance thresholds for LOD (Level of Detail) changes
export const LOD_DISTANCES = {
  HIGH: 10,   // High detail up to 10 units away
  MEDIUM: 20, // Medium detail up to 20 units away
  LOW: 30     // Low detail up to 30 units away
};

/**
 * Utility to optimize material settings based on distance from camera
 */
export const optimizeMaterialForDistance = (
  material: THREE.Material, 
  distance: number
): void => {
  if (!material) return;
  
  // For physically-based materials
  if (material instanceof THREE.MeshStandardMaterial || 
      material instanceof THREE.MeshPhysicalMaterial) {
    
    if (distance < LOD_DISTANCES.HIGH) {
      // High detail - use original settings
      material.roughness = Math.min(material.roughness, 0.7);
      material.metalness = Math.min(material.metalness, 0.7);
      if ('clearcoat' in material) {
        (material as THREE.MeshPhysicalMaterial).clearcoat = 0.5;
      }
    } 
    else if (distance < LOD_DISTANCES.MEDIUM) {
      // Medium detail - reduce quality
      material.roughness = Math.min(material.roughness + 0.2, 1.0);
      material.metalness = Math.max(material.metalness - 0.2, 0);
      if ('clearcoat' in material) {
        (material as THREE.MeshPhysicalMaterial).clearcoat = 0;
      }
    }
    else {
      // Low detail - minimum quality
      material.roughness = 1.0;
      material.metalness = 0;
      if ('clearcoat' in material) {
        (material as THREE.MeshPhysicalMaterial).clearcoat = 0;
      }
    }
  }
};

/**
 * Apply LOD optimizations to a group of meshes based on distance
 */
export const applyLODToGroup = (
  group: THREE.Group,
  cameraPosition: THREE.Vector3
): void => {
  if (!group || !cameraPosition) return;
  
  const distance = group.position.distanceTo(cameraPosition);
  
  // Apply different optimizations based on distance
  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      // Handle arrays of materials
      if (Array.isArray(child.material)) {
        child.material.forEach(mat => optimizeMaterialForDistance(mat, distance));
      } else {
        optimizeMaterialForDistance(child.material, distance);
      }
      
      // Adjust geometry detail level based on distance
      if (distance > LOD_DISTANCES.MEDIUM) {
        // For far objects, use lower geometry detail
        child.raycast = () => false; // Disable raycasting for far objects
      } else {
        // Reset to default raycast behavior for closer objects
        child.raycast = THREE.Mesh.prototype.raycast;
      }
    }
  });
};
