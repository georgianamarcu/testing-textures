import { Canvas } from "@react-three/fiber";
import { Stage, Environment } from "@react-three/drei";
import Controls from "./components/Controls";
import { Suspense } from "react";
import Mesh from "./components/Mesh";
import Overlay from "./components/overlay/Overlay";

function App() {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ fov: 30 }}>
        <Stage preset="rembrandt" intensity={0.6} adjustCamera={1.2}>
          <Suspense fallback={null}>
            <Mesh />
          </Suspense>
        </Stage>
        <Controls />
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
