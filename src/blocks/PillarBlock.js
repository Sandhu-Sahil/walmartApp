import React from 'react';
import * as THREE from 'three';

const PillarBlock = () => {
  const blockSize = 10;
  const pillarRadius = 5;
  const pillarHeight = blockSize;

  const geometry = new THREE.CylinderGeometry(pillarRadius, pillarRadius, pillarHeight, 32);
  const pillarPosition = [0, 0, 0];

  return (
    <mesh geometry={geometry} position={pillarPosition}>
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default PillarBlock;
