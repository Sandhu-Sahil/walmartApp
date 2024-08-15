import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber/native';

const BillingCounterBlock = () => {
  const groupRef = useRef();

  const blockSize = 10;
  const tableHeight = 3;
  const tableThickness = 0.5;
  const tableWidth = 6;
  const tableDepth = 4;
  const computerWidth = 1.5;
  const computerHeight = 1;
  const humanHeight = 5;
  const humanRadius = 0.5;

  const group = new THREE.Group();

  const tableGeometry = new THREE.BoxGeometry(tableWidth, tableThickness, tableDepth);
  const tableMaterial = new THREE.MeshStandardMaterial({ color: 'brown' });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  table.position.set(0, tableHeight / 2, 0);
  group.add(table);

  const computerGeometry = new THREE.BoxGeometry(computerWidth, computerHeight, tableThickness);
  const computerMaterial = new THREE.MeshStandardMaterial({ color: 'black' });
  const computer = new THREE.Mesh(computerGeometry, computerMaterial);
  computer.position.set(0, tableHeight + computerHeight / 2, -tableDepth / 2 + tableThickness);
  group.add(computer);

  const bodyGeometry = new THREE.CylinderGeometry(humanRadius, humanRadius, humanHeight, 32);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, humanHeight / 2, tableDepth / 2 + humanRadius);
  group.add(body);

  const headGeometry = new THREE.SphereGeometry(humanRadius, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 'peachpuff' });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, humanHeight + humanRadius, tableDepth / 2 + humanRadius);
  group.add(head);

  useFrame(() => {
    // Additional logic can be added here if needed
  });

  return <primitive object={group} position={[0, -4, 0]} />;
};

export default BillingCounterBlock;
