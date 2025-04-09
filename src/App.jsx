import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import Controls from "./components/Controls";
import Overlay from "./components/overlay/Overlay";
import { useAppStore } from "./store/appStore";
import { ConditionalRender } from "./components/ConditionalRender";

function App() {
  const preset = useAppStore((state) => state.stagePreset);
  // const intensity = useAppStore((state) => state.lightIntensity);
  const selectedModel = useAppStore((state) => state.selectedModel);
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach="background" args={["#DFE4E6"]} />
        <Stage
          key={selectedModel}
          preset="rembrandt"
          intensity={0.1}
          adjustCamera={1.5}
          environment="city"
        >
          <ConditionalRender selectedModel={selectedModel} />
        </Stage>
        <Controls />
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
