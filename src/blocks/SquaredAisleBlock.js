import React from 'react';
import * as THREE from 'three';

const SquaredAisleBlock = () => {
  const blockSize = 10;
  const shelfThickness = 0.5;
  const shelfHeight = 2;
  const numShelves = 4;
  const pillarThickness = 0.5;

  const group = new THREE.Group();

  // Create shelves
  for (let i = 0; i <= numShelves; i++) {
    const shelfGeometry = new THREE.BoxGeometry(blockSize, shelfThickness, blockSize);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(0, -i * shelfHeight, 0); 
    group.add(shelf);
  }

  // Create vertical supports (pillars) at each corner
  const pillarGeometry = new THREE.BoxGeometry(pillarThickness, blockSize, pillarThickness);
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 'brown' });

  const positions = [
    [-blockSize / 2 + pillarThickness / 2, -blockSize / 2, -blockSize / 2 + pillarThickness / 2],
    [-blockSize / 2 + pillarThickness / 2, -blockSize / 2, blockSize / 2 - pillarThickness / 2],
    [blockSize / 2 - pillarThickness / 2, -blockSize / 2, -blockSize / 2 + pillarThickness / 2],
    [blockSize / 2 - pillarThickness / 2, -blockSize / 2, blockSize / 2 - pillarThickness / 2],
  ];

  positions.forEach(position => {
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.set(...position);
    group.add(pillar);
  });

  // Add random products on the shelves
  const productShapes = ['cube', 'cylinder'];
  const colors = ['blue', 'green', 'yellow', 'purple'];

  for (let i = 0; i <= numShelves; i++) {
    const numProducts = Math.floor(Math.random() * 4) + 1; 

    for (let j = 0; j < numProducts; j++) {
      const shape = productShapes[Math.floor(Math.random() * productShapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      let product;

      if (shape === 'cube') {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color });
        product = new THREE.Mesh(geometry, material);
      } else if (shape === 'cylinder') {
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        product = new THREE.Mesh(geometry, material);
      }

      const xPos = (Math.random() - 0.5) * (blockSize - 2);
      const zPos = (Math.random() - 0.5) * (blockSize - 2);
      product.position.set(xPos, -i * shelfHeight + shelfHeight / 2, zPos); 

      group.add(product);
    }
  }

  return <primitive object={group} position={[0, blockSize / 2, 0]} />;
};

export default SquaredAisleBlock;
