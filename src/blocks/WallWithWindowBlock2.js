import React from 'react';
import * as THREE from 'three';

const WallWithWindowBlock2 = () => {
  const blockSize = 10;
  const wallThickness = 1;
  const windowSize = 4;

  // Define the outer shape of the wall
  const shape = new THREE.Shape();
  shape.moveTo(-blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, -blockSize / 2);

  // Create the window hole in the center of the wall
  const windowHole = new THREE.Path();
  windowHole.moveTo(-windowSize / 2, -windowSize / 2);
  windowHole.lineTo(windowSize / 2, -windowSize / 2);
  windowHole.lineTo(windowSize / 2, windowSize / 2);
  windowHole.lineTo(-windowSize / 2, windowSize / 2);
  windowHole.lineTo(-windowSize / 2, -windowSize / 2);

  shape.holes.push(windowHole);

  // Extrude the shape to create the wall with depth
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: wallThickness, bevelEnabled: false });

  // Center the wall within the cube and rotate it 90 degrees on the x,z plane
  const wallPosition = [0, 0, 0];

  return (
    <mesh geometry={geometry} position={wallPosition} rotation={[0, Math.PI / 2, 0]}>
      <meshStandardMaterial color="#F9F9F9" />
    </mesh>
  );
};

export default WallWithWindowBlock2;
