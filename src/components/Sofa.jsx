import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useAppStore } from "../store/appStore";
import {
  TextureLoader,
  SRGBColorSpace,
  LinearSRGBColorSpace,
  RepeatWrapping,
} from "three";

export function Sofa(props) {
  const { nodes, materials } = useGLTF("/sofa.glb");
  const albedoUrl = useAppStore((state) => state.albedoUrl);
  const roughnessUrl = useAppStore((state) => state.roughnessUrl);
  const normalsUrl = useAppStore((state) => state.normalsUrl);
  const repeat = useAppStore((state) => state.repeat);

  console.log(albedoUrl);

  const sofa = useRef();

  useEffect(() => {
    const sofaMesh = sofa.current;
    if (!sofaMesh) return;

    const updateTexture = (url, mapType, colorSpace) => {
      const textureLoader = new TextureLoader();
      if (url) {
        textureLoader.load(url, (texture) => {
          texture.colorSpace = colorSpace;
          texture.flipY = false;
          texture.repeat.set(repeat, repeat);
          texture.wrapS = RepeatWrapping;
          texture.wrapT = RepeatWrapping;

          if (sofaMesh.material[mapType]) {
            sofaMesh.material[mapType].dispose();
          }
          sofaMesh.material[mapType] = texture;
          sofaMesh.material.needsUpdate = true;
        });
      } else {
        if (sofaMesh.material[mapType]) {
          sofaMesh.material[mapType].dispose();
          sofaMesh.material[mapType] = null;
          sofaMesh.material.needsUpdate = true;
        }
      }
    };

    updateTexture(albedoUrl, "map", SRGBColorSpace);
    updateTexture(roughnessUrl, "roughnessMap", LinearSRGBColorSpace);
    updateTexture(normalsUrl, "normalMap", LinearSRGBColorSpace);
  }, [albedoUrl, roughnessUrl, normalsUrl, repeat, sofa]);

  return (
    <group {...props} dispose={null} scale={[5, 5, 5]}>
      <mesh
        ref={sofa}
        geometry={nodes.sofa.geometry}
        material={materials.fabric}
      />
    </group>
  );
}

useGLTF.preload("/sofa.glb");
