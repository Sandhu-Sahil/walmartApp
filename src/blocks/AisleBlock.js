import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

const AisleBlock = () => {
  const groupRef = useRef();

  const blockSize = 10;
  const slitHeight = 3;
  const slitSpacing = 2;
  const aisleDepth = 2;
  const sideThickness = 0.5;

  const shape = new THREE.Shape();
  shape.moveTo(-blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, -blockSize / 2);

  const hole1 = new THREE.Path().moveTo(-blockSize / 2, blockSize / 2 - slitSpacing).lineTo(blockSize / 2, blockSize / 2 - slitSpacing).lineTo(blockSize / 2, blockSize / 2 - slitSpacing - slitHeight).lineTo(-blockSize / 2, blockSize / 2 - slitSpacing - slitHeight).lineTo(-blockSize / 2, blockSize / 2 - slitSpacing);
  const hole2 = new THREE.Path().moveTo(-blockSize / 2, slitHeight / 2).lineTo(blockSize / 2, slitHeight / 2).lineTo(blockSize / 2, -slitHeight / 2).lineTo(-blockSize / 2, -slitHeight / 2).lineTo(-blockSize / 2, slitHeight / 2);
  const hole3 = new THREE.Path().moveTo(-blockSize / 2, -blockSize / 2 + slitSpacing).lineTo(blockSize / 2, -blockSize / 2 + slitSpacing).lineTo(blockSize / 2, -blockSize / 2 + slitSpacing + slitHeight).lineTo(-blockSize / 2, -blockSize / 2 + slitSpacing + slitHeight).lineTo(-blockSize / 2, -blockSize / 2 + slitSpacing);

  shape.holes.push(hole1, hole2, hole3);

  const geometry = new THREE.ExtrudeGeometry(shape, { depth: aisleDepth, bevelEnabled: false });

  useFrame(() => {
    // Animation or other effects can be added here if needed
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="red" />
      </mesh>
      {/* Left Side Panel */}
      <mesh position={[-blockSize / 2 + sideThickness / 2, 0, 0]}>
        <boxGeometry args={[sideThickness, blockSize, aisleDepth]} />
        <meshStandardMaterial attach="material" color="brown" />
      </mesh>
      {/* Right Side Panel */}
      <mesh position={[blockSize / 2 - sideThickness / 2, 0, 0]}>
        <boxGeometry args={[sideThickness, blockSize, aisleDepth]} />
        <meshStandardMaterial attach="material" color="brown" />
      </mesh>
      {/* Products */}
      {/* You can add logic for random products similar to the original code */}
    </group>
  );
};

export default AisleBlock;
