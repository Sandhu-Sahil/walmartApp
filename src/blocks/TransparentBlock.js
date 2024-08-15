import React from 'react';
import * as THREE from 'three';

const TransparentBlock = () => {
  const blockSize = 10;

  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);

  const material = new THREE.MeshStandardMaterial({ color: 'white', transparent: true, opacity: 0 });

  const blockPosition = [0, 0, 0];

  return (
    <mesh geometry={geometry} material={material} position={blockPosition} />
  );
};

export default TransparentBlock;
