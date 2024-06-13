import { useRef, useEffect, Suspense } from "react";
import { Bed } from "./Bed";
import { Chair } from "./Chair";

export const ConditionalRender = ({ selectedModel }) => {
  const bedRef = useRef();
  const chairRef = useRef();

  useEffect(() => {
    const currentBedRef = bedRef.current;
    const currentChairRef = chairRef.current;
    return () => {
      if (selectedModel === "bed" && currentBedRef) {
        currentBedRef.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      } else if (selectedModel === "chair" && currentChairRef) {
        currentChairRef.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [selectedModel]);

  return (
    <Suspense fallback={null}>
      {selectedModel === "bed" && <Bed ref={bedRef} />}
      {selectedModel === "chair" && <Chair ref={chairRef} />}
    </Suspense>
  );
};
