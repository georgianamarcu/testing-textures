import { Suspense } from "react";
import Controls from "./Controls";
import { Environment } from "@react-three/drei";

// eslint-disable-next-line react/prop-types
function Scene() {
  return (
    <>
      <Controls />
      <Suspense fallback={null}>
        <Environment files={"/pine_attic_1k.hdr"} />
      </Suspense>
    </>
  );
}

export default Scene;
