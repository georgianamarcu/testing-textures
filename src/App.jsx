import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Scene from "./components/Scene";
import Overlay from "./components/Overlay";
import { useState } from "react";

function App() {
  const [smallSofa, setSmallSofa] = useState(true);
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 45,
          position: [
            -2.1089695006544007, 0.06982244031026139, 4.53292096469145,
          ],
          rotation: [
            -0.015402191985851415, -0.4354229232915067, -0.006496972981844338,
          ],
        }}
      >
        <Scene setSofa={smallSofa} toggleSofa={smallSofa} />
        {/* <Perf position="top-left" overClock /> */}
      </Canvas>
      <Overlay setSmallSofa={setSmallSofa} />
      <Loader />
    </>
  );
}

export default App;
