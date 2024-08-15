import React, { useRef } from 'react';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useThree } from '@react-three/fiber/native';

const ZoomControls = () => {
  const { camera } = useThree();
  const pinchRef = useRef(null);

  const handlePinch = (event) => {
    if (event.nativeEvent.scale) {
      const scale = event.nativeEvent.scale;
      camera.zoom *= scale;
      camera.updateProjectionMatrix();
    }
  };

  return (
    <PinchGestureHandler
      ref={pinchRef}
      onGestureEvent={handlePinch}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          camera.updateProjectionMatrix();
        }
      }}
    >
      <></> {/* Empty fragment as a placeholder */}
    </PinchGestureHandler>
  );
};

export default ZoomControls;
