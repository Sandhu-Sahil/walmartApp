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

  const group = new THREE.Group();
  const aisleBlock = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 'red' }));
  group.add(aisleBlock);

  const sidePanelGeometry = new THREE.BoxGeometry(sideThickness, blockSize, aisleDepth);
  const sidePanelMaterial = new THREE.MeshStandardMaterial({ color: 'brown' });

  const leftSidePanel = new THREE.Mesh(sidePanelGeometry, sidePanelMaterial);
  leftSidePanel.position.set(-blockSize / 2 + sideThickness / 2, 0, 0);
  group.add(leftSidePanel);

  const rightSidePanel = new THREE.Mesh(sidePanelGeometry, sidePanelMaterial);
  rightSidePanel.position.set(blockSize / 2 - sideThickness / 2, 0, 0);
  group.add(rightSidePanel);

  const productShapes = ['cube', 'cylinder'];
  const colors = ['blue', 'green', 'yellow', 'purple'];

  for (let i = 0; i < 3; i++) {
    const numProducts = Math.floor(Math.random() * 4) + 1;

    for (let j = 0; j < numProducts; j++) {
      const shape = productShapes[Math.floor(Math.random() * productShapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      let product;

      if (shape === 'cube') {
        const productGeometry = new THREE.BoxGeometry(1, 1, 1);
        const productMaterial = new THREE.MeshStandardMaterial({ color });
        product = new THREE.Mesh(productGeometry, productMaterial);
      } else if (shape === 'cylinder') {
        const productGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const productMaterial = new THREE.MeshStandardMaterial({ color });
        product = new THREE.Mesh(productGeometry, productMaterial);
      }

      const xPos = (Math.random() - 0.5) * (blockSize - 2);
      const zPos = 0;
      product.position.set(xPos, i * slitHeight - blockSize / 2 + slitHeight / 2, zPos);

      group.add(product);
    }
  }

  return <primitive object={group} position={[0, 0, 0]} />;
};

export default AisleBlock;
