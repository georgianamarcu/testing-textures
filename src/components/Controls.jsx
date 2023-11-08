import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Controls() {
  const cameraRef = useRef();
  return (
    <>
      <OrbitControls
        ref={cameraRef}
        makeDefault
        enablePan={false}
        dampingFactor={0.07}
        rotateSpeed={0.2}
        minPolarAngle={1}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        // onChange={() => {
        //   if (cameraRef) {
        //     console.log(cameraRef.current.object);
        //   }
        // }}
      />
    </>
  );
}

export default Controls;
