import { Suspense } from "react";
import Controls from "./Controls";
import { Environment } from "@react-three/drei";
import { Room } from "./Room";
import Effects from "./Effects";
import Sofa from "./Sofa";
import Sofa2 from "./Sofa2";

// eslint-disable-next-line react/prop-types
function Scene({ setSofa, toggleSofa }) {
  return (
    <>
      <Controls />
      <Suspense fallback={null}>
        <Room toggleSofa={toggleSofa} />
        <Environment files={"/pine_attic_1k.hdr"} background blur={0.4} />
      </Suspense>
      {setSofa ? <Sofa /> : <Sofa2 />}
      <Effects />
    </>
  );
}

export default Scene;
