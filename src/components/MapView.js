import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei';
import { View, StyleSheet } from 'react-native';
import AisleBlock from '../blocks/AisleBlock';
// import WallWithWindowBlock from '../blocks/WallBlock';
// import CameraControls from './CameraControls';
import mapData from '../data/map.json';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import ZoomControls from './ZoomControls';

const MapView = () => {
  const gridSize = 10;
  const [objects, setObjects] = useState([]);

  return (
    <View style={styles.container}>
    <GestureHandlerRootView style={styles.container}>
    <PinchGestureHandler>
        <View style={{flex: 1}}>
        <Canvas camera={{ position: [0, 150, 400], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[300, 300]} />
            <meshStandardMaterial color="green" />
            </mesh>
            {mapData.objects.map((obj) => {
                switch (obj.type) {
                    case 'aisle':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <AisleBlock />
                                <meshStandardMaterial color="red" />
                            </mesh>
                        );
                    case 'wall':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <WallWithWindowBlock /> */}
                                <meshStandardMaterial color="blue" />
                            </mesh>
                        );
                    case 'aisle2':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <AisleBlock2 /> */}
                                <meshStandardMaterial color="red" />
                            </mesh>
                        );
                    case 'wall2':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <WallWithWindowBlock2 /> */}
                                <meshStandardMaterial color="blue" />
                            </mesh>
                        );
                    case 'pillar':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <PillarBlock /> */}
                                <meshStandardMaterial color="gray" />
                            </mesh>
                        );
                    case 'cradle':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <CradleBlock /> */}
                                <meshStandardMaterial color="yellow" />
                            </mesh>
                        );
                    case 'billingCounter':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <BillingCounterBlock /> */}
                                <meshStandardMaterial color="purple" />
                            </mesh>
                        );
                    case 'squaredAisle':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <SquaredAisleBlock /> */}
                                <meshStandardMaterial color="green" />
                            </mesh>
                        );
                    case 'transparent':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                {/* <TransparentBlock /> */}
                                <meshStandardMaterial color="transparent" />
                            </mesh>
                        );
                    
                    default:
                        return null;
                    }
            })}
            <OrbitControls
            enableZoom={false}   // Enable zooming
            enablePan={true}    // Enable panning
            enableRotate={true} // Enable rotation
            
            />

            <ZoomControls />
        </Canvas>
        </View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapView;
