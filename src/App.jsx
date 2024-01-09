import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import Controls from "./components/Controls";
import { Suspense } from "react";
import { Sofa } from "./components/Sofa";
import Overlay from "./components/overlay/Overlay";
import { useAppStore } from "./store/appStore";

function App() {
  const preset = useAppStore((state) => state.stagePreset);
  const intensity = useAppStore((state) => state.lightIntensity);
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ fov: 30 }}>
        <Stage preset={preset} intensity={intensity} adjustCamera={1.2}>
          <Suspense fallback={null}>
            <Sofa />
          </Suspense>
        </Stage>
        <Controls />
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
