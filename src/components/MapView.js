import React from 'react';
import { Canvas } from '@react-three/fiber/native';
import mapData from '../data/mapConfig.json';

const MapView = ({ aisleId }) => {
    const aisle = mapData.find(a => a.aisleId === aisleId);

    return (
        <Canvas>
            {/* Render map and highlight aisle path */}
            {/* Add your Three.js code here to display the map */}

            {/* Example: */}
            <mesh>
                <boxGeometry args={[1, 1]} />
                <meshBasicMaterial color="red" />
            </mesh> 
            

        </Canvas>
    );
};

export default MapView;
