import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AisleBlock from '../blocks/AisleBlock';
import mapData from '../data/map.json';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import ZoomControls from './ZoomControls';
import WallWithWindowBlock from '../blocks/WallWithWindowBlock';
import AisleBlock2 from '../blocks/AisleBlock2';
import WallWithWindowBlock2 from '../blocks/WallWithWindowBlock2';
import PillarBlock from '../blocks/PillarBlock';
import CradleBlock from '../blocks/CradleBlock';
import TransparentBlock from '../blocks/TransparentBlock';
import CradleBlock2 from '../blocks/CradleBlock2';
import SquaredAisleBlock from '../blocks/SquaredAisleBlock';
import BillingCounterBlock from '../blocks/BillingCounterBlock';
import * as THREE from 'three';
import PinBlock from '../blocks/PinBlock';

const MapView = ( {aisleId, locate, setLocate }) => {
    const gridSize = 200; // must be a multiple of 10
    const [objects, setObjects] = useState([]);
    const [cameraPos, setCameraPos] = useState([0, 100, 300]);
    const [targetPos, setTargetPos] = useState([0, 0, 0]);
    const [startPosition, setStartPosition] = useState(null);
    const [path, setPath] = useState([]);
    const [index, setIndex] = useState(0);
    // const cameraQuaternion = useRef(new THREE.Quaternion());

    useEffect(() => {
        if (startPosition) {
            const grid = generateGrid(mapData.objects);
            const aislePosition = getAislePosition(aisleId);
            const foundPath = findShortestPath(grid, startPosition, aislePosition);
            if (foundPath) {
                setPath(foundPath);
            }
        }
    }, [startPosition, locate]);


    const generateGrid = (objects) => {
        const grid = {};
    
        // Initialize the grid with 'empty' cells
        for (let x = 0 - gridSize/2; x <= gridSize/2; x=x+10) {
            grid[x] = {};
            for (let y = 0 - gridSize/2; y <= gridSize/2; y=y+10) {
                grid[x][y] = 'empty';
            }

        }
    
        // Set the positions with objects as 'block'
        objects.forEach(obj => {
            const [x, y, z] = obj.position;
            grid[x][z] = 'block';
        });
    
        return grid;
    };

    const findShortestPath = (grid, start, end, gridSize) => {
        const queue = [start];
        const visited = {};
        const cameFrom = {};

        grid[start[0]][start[2]] = 'empty';
        grid[end[0]][end[2]] = 'empty';
    
        while (queue.length > 0) {
            const current = queue.shift();
    
            if (current[0] == end[0] && current[2] == end[2]) {
                return reconstructPath(cameFrom, start, end);
            }
    
            const neighbors = getNeighbors(grid, current);
    
            neighbors.forEach(neighbor => {
                if (!visited[neighbor]) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                    cameFrom[neighbor] = current;
                }
            });
        }
    
        return null;
    }

    const reconstructPath = (cameFrom, start, end) => {
        const path = [];
        let current = end;

        while (current[0] != start[0] || current[2] != start[2]) {
            path.push(current);
            current = cameFrom[current];
        }

        path.push(start);

        return path.reverse();
    }

    const getNeighbors = (grid, position) => {
        const neighbors = [];
        const [x, y, z] = position;

        if (grid[x - 10] && grid[x - 10][z] === 'empty') {
            neighbors.push([x - 10, y, z]);
        }
        if (grid[x + 10] && grid[x + 10][z] === 'empty') {
            neighbors.push([x + 10, y, z]);
        }
        if (grid[x] && grid[x][z - 10] === 'empty') {
            neighbors.push([x, y, z - 10]);
        }
        if (grid[x] && grid[x][z + 10] === 'empty') {
            neighbors.push([x, y, z + 10]);
        }

        return neighbors;
    }
    

    const getAislePosition = (id) => {
        const aisle = mapData.objects.find(obj => obj.id == id);
        return aisle ? aisle.position : null;
    };

    const CameraController = () => {
        const { camera } = useThree();

        // useEffect(() => {
        //     cameraQuaternion.current.copy(camera.quaternion); // Save the current orientation
        // }, [cameraQuaternion, camera]);
      

        useEffect(() => {
            camera.position.set(...cameraPos);
            // camera.quaternion.copy(cameraQuaternion.current);
            // camera.lookAt(new THREE.Vector3(...targetPos));
            // camera.lookAt(...targetPos);
            camera.updateProjectionMatrix();
        }, [cameraPos, targetPos, camera]);

        return null;
    };

    const handleZoomIn = () => {
        if (index < path.length - 1) {
            setCameraPos([path[index][0], 5, path[index][2]+10]);
            setTargetPos([path[index][0], 5, path[index][2]]);
            setIndex(index + 1);
        }
    };

    const handleZoomOut = () => {
        if (index > 0) {
            setCameraPos([path[index - 1][0], 5, path[index - 1][2]+10]);
            setTargetPos([path[index - 1][0], 5, path[index - 1][2]]);
            setIndex(index - 1);
        }
    };    
        

  return (
    <View style={styles.container}>
        <Canvas >
            <CameraController />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[gridSize, gridSize]} />
                {
                    // plane ka color
                }
                <meshStandardMaterial color='white' />
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
                                <WallWithWindowBlock />
                                <meshStandardMaterial color="blue" />
                            </mesh>
                        );
                    case 'aisle2':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <AisleBlock2 />
                                <meshStandardMaterial color="red" />
                            </mesh>
                        );
                    case 'wall2':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <WallWithWindowBlock2 />
                                <meshStandardMaterial color="blue" />
                            </mesh>
                        );
                    case 'pillar':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <PillarBlock />
                                <meshStandardMaterial color="gray" />
                            </mesh>
                        );
                    case 'cradle':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <CradleBlock />
                                <meshStandardMaterial color="yellow" />
                            </mesh>
                        );
                    case 'cradle2':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <CradleBlock2 />
                                <meshStandardMaterial color="yellow" />
                            </mesh>
                        );
                    case 'billingCounter':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <BillingCounterBlock />
                                <meshStandardMaterial color="purple" />
                            </mesh>
                        );
                    case 'squaredAisle':
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <SquaredAisleBlock />
                                <meshStandardMaterial color="green" />
                            </mesh>
                        );
                    case 'transparent':
                        if (obj.position[1] === 5 && startPosition === null) {
                            setStartPosition(obj.position);
                        }
                        return (
                            <mesh key={obj.id} position={obj.position} castShadow>
                                <TransparentBlock />
                                <meshStandardMaterial color="white" />
                            </mesh>
                        );
                    
                    default:
                        return null;
                    }
            })}

            {/* PinBlock at targetPos  */}
            <mesh position={[targetPos[0], 1, targetPos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
                <PinBlock args={[10, 10]} />
                <meshStandardMaterial color="red" transparent />
            </mesh>



            {path.map((pos, index) => {
                return (
                <mesh key={index} position={[pos[0], 1, pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <meshStandardMaterial color="#05ADE2" transparent />
                </mesh>
            )
            })}

            <OrbitControls
                enableZoom={false}   // Enable zooming
                enablePan={true}    // Enable panning
                enableRotate={true} // Enable rotation
                enableDamping={true} // Enable damping
                dampingFactor={0.2} // Amount of damping
                rotateSpeed={1}    // Rotation speed
                panSpeed={0.5}       // Panning speed
                target={new THREE.Vector3(...targetPos)}  // Set the rotation target to the current target position
            />

            {/* <ZoomControls /> */}
        </Canvas>
        {
            locate ? (
                <View style={styles.zoomControls}>
                    <TouchableOpacity onPress={handleZoomIn} style={styles.button}>
                    <Text style={styles.buttonText}>Forward</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleZoomOut} style={styles.button}>
                    <Text style={styles.buttonText}>Backward</Text>
                    </TouchableOpacity>
                </View>
            ) : null
        }

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },

    zoomControls: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    buttonStop:{
        marginTop: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default MapView;
