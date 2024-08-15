import React from 'react';
import { View, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { OrbitControls } from 'three-stdlib';
import * as THREE from 'three';
import mapConfig from '../data/mapConfig.json';

const CameraControls = () => {
  useFrame(({ camera }) => {
    camera.position.set(0, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return null;
};

const Aisles = ({ product }) => {
  return mapConfig.mapConfig.aisles.map((aisle, index) => (
    <mesh key={index} position={[aisle.position.x, aisle.position.y, aisle.position.z]}>
      <boxGeometry args={[2, 2, 10]} />
      <meshStandardMaterial color={aisle.id === product.aisleId ? 'green' : 'blue'} />
    </mesh>
  ));
};

const MapScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }} camera={{ position: [0, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Ground Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {/* Render Aisles */}
        <Aisles product={product} />

        {/* Camera Controls */}
        <CameraControls />

        {/* Optional Orbit Controls */}
        <OrbitControls />
      </Canvas>
      <View style={{ padding: 16, backgroundColor: 'white', borderTopWidth: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
        <Text>{product.details}</Text>
        <Text>Aisle: {product.aisleId}</Text>
      </View>
    </View>
  );
};

export default MapScreen;
