import React from 'react';
import * as THREE from 'three';

const CradleBlock = () => {
  const blockSize = 10;
  const unitHeight = 10;
  const cradleHeight = 2.5;
  const cradleDepth = 4;
  const cradleThickness = 0.5;
  const supportThickness = 0.5;

  const group = new THREE.Group();

  const supportGeometry = new THREE.BoxGeometry(supportThickness, unitHeight, supportThickness);
  const supportMaterial = new THREE.MeshStandardMaterial({ color: '#96741E' });

  const supportPositions = [
    [-blockSize / 2 + supportThickness / 2, 0, -cradleDepth / 2],
    [-blockSize / 2 + supportThickness / 2, 0, cradleDepth / 2],
    [blockSize / 2 - supportThickness / 2, 0, -cradleDepth / 2],
    [blockSize / 2 - supportThickness / 2, 0, cradleDepth / 2],
  ];

  supportPositions.forEach(position => {
    const support = new THREE.Mesh(supportGeometry, supportMaterial);
    support.position.set(...position);
    group.add(support);
  });

  for (let i = 0; i < 3; i++) {
    const cradleGeometry = new THREE.BoxGeometry(blockSize - supportThickness, cradleThickness, cradleDepth);
    const cradleMaterial = new THREE.MeshStandardMaterial({ color: '#FFDF8B' });
    const cradle = new THREE.Mesh(cradleGeometry, cradleMaterial);
    cradle.position.set(0, i * cradleHeight + cradleHeight / 2 - unitHeight / 2, 0);
    group.add(cradle);
  }

  const boxGeometry = new THREE.BoxGeometry(cradleDepth - 1, cradleHeight - 1, cradleDepth - 1);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: '#FFB35F' });

  for (let i = 0; i < 3; i++) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, i * cradleHeight + cradleHeight - unitHeight / 2, 0);
    group.add(box);
  }

  return <primitive object={group} />;
};

export default CradleBlock;
