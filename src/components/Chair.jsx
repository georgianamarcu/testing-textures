import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useMemo, forwardRef } from "react";
import { useAppStore } from "../store/appStore";
import {
  TextureLoader,
  SRGBColorSpace,
  LinearSRGBColorSpace,
  RepeatWrapping,
  MeshStandardMaterial,
  Texture,
} from "three";

export const Chair = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/chair.glb");
  const albedoUrl = useAppStore((state) => state.albedoUrl);
  const roughnessUrl = useAppStore((state) => state.roughnessUrl);
  const normalsUrl = useAppStore((state) => state.normalsUrl);
  const repeat = useAppStore((state) => state.repeat);
  const enableRandom = useAppStore((state) => state.enableRandom);
  const useNoiseMap = useAppStore((state) => state.useNoiseMap);
  const useSuslikMethod = useAppStore((state) => state.useSuslikMethod);
  const debugNoise = useAppStore((state) => state.debugNoise);

  const chair = useRef();
  const standardMaterial = new MeshStandardMaterial();

  //**RANDOM UV SHADER */
  const textureLoader = useMemo(() => new TextureLoader(), []);

  useEffect(() => {
    const chairMesh = chair.current;
    if (!chairMesh) return;

    const updateTexture = (url, mapType, colorSpace) => {
      if (url) {
        textureLoader.load(
          url,
          (texture) => {
            texture.colorSpace = colorSpace;
            texture.flipY = false;
            texture.repeat.set(repeat, repeat);
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;

            if (!chairMesh.material[mapType]) {
              chairMesh.material[mapType] = new Texture();
            }

            chairMesh.material[mapType].dispose();
            chairMesh.material[mapType] = texture;
            chairMesh.material.needsUpdate = true;
          },
          undefined,
          (error) => {
            console.error("Texture load error:", error);
          }
        );
      } else {
        if (chairMesh.material[mapType]) {
          chairMesh.material[mapType].dispose();
          chairMesh.material[mapType] = null;
          chairMesh.material.needsUpdate = true;
        }
      }
    };

    updateTexture(albedoUrl, "map", SRGBColorSpace);
    updateTexture(roughnessUrl, "roughnessMap", LinearSRGBColorSpace);
    updateTexture(normalsUrl, "normalMap", LinearSRGBColorSpace);
  }, [
    albedoUrl,
    roughnessUrl,
    normalsUrl,
    repeat,
    chair,
    enableRandom,
    useNoiseMap,
    useSuslikMethod,
    debugNoise,
  ]);

  return (
    <group ref={ref} {...props} dispose={null} rotation={[0, 0.5, 0]}>
      <mesh
        geometry={nodes.legs.geometry}
        material={materials["Metal Chrome Marked"]}
      />
      <mesh
        ref={chair}
        geometry={nodes.material.geometry}
        material={standardMaterial}
      />
    </group>
  );
});

useGLTF.preload("/chair.glb");
