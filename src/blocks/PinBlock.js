import React from 'react';
import * as THREE from 'three';
import { Mesh, MeshStandardMaterial, SphereGeometry, ConeGeometry } from '@react-three/fiber/native';

const PinBlock = () => {
  const pinHeight = 8; // Total height of the pin
  const pinRadius = 2; // Radius of the pin head
  const coneHeight = 5; // Height of the cone part
  const coneRadius = 1; // Radius of the cone base

  // Create the pin head (a sphere)
  const sphereGeometry = new SphereGeometry(pinRadius, 32, 32);
  const sphereMaterial = new MeshStandardMaterial({ color: 'red' });
  const sphere = new Mesh(sphereGeometry, sphereMaterial);

  // Position the sphere at the top of the pin
  sphere.position.set(0, coneHeight + pinRadius, 0);

  // Create the pin tip (a cone)
  const coneGeometry = new ConeGeometry(coneRadius, coneHeight, 32);
  const coneMaterial = new MeshStandardMaterial({ color: 'red' });
  const cone = new Mesh(coneGeometry, coneMaterial);

  // Position the cone at the bottom of the pin
  cone.position.set(0, coneHeight / 2, 0);

  return (
    <group position={[0, pinHeight / 2, 0]}>
      <primitive object={sphere} />
      <primitive object={cone} />
    </group>
  );
};

export default PinBlock;
