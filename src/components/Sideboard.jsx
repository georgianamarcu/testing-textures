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

export const Sideboard = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/sideboard.glb");
  const albedoUrl = useAppStore((state) => state.albedoUrl);
  const roughnessUrl = useAppStore((state) => state.roughnessUrl);
  const normalsUrl = useAppStore((state) => state.normalsUrl);
  const repeat = useAppStore((state) => state.repeat);
  const enableRandom = useAppStore((state) => state.enableRandom);
  const useNoiseMap = useAppStore((state) => state.useNoiseMap);
  const useSuslikMethod = useAppStore((state) => state.useSuslikMethod);
  const debugNoise = useAppStore((state) => state.debugNoise);

  const sideboard = useRef();
  const standardMaterial = new MeshStandardMaterial();

  //**RANDOM UV SHADER */
  const textureLoader = useMemo(() => new TextureLoader(), []);

  useEffect(() => {
    const sideboardMesh = sideboard.current;
    if (!sideboardMesh) return;

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

            if (!sideboardMesh.material[mapType]) {
              sideboardMesh.material[mapType] = new Texture();
            }

            sideboardMesh.material[mapType].dispose();
            sideboardMesh.material[mapType] = texture;
            sideboardMesh.material.needsUpdate = true;
          },
          undefined,
          (error) => {
            console.error("Texture load error:", error);
          }
        );
      } else {
        if (sideboardMesh.material[mapType]) {
          sideboardMesh.material[mapType].dispose();
          sideboardMesh.material[mapType] = null;
          sideboardMesh.material.needsUpdate = true;
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
    sideboard,
    enableRandom,
    useNoiseMap,
    useSuslikMethod,
    debugNoise,
  ]);

  return (
    <group ref={ref} {...props} dispose={null} rotation={[0, 0.5, 0]}>
      <mesh
        ref={sideboard}
        castShadow
        receiveShadow
        geometry={nodes.sideboard.geometry}
        material={standardMaterial}
        position={[-1.354, 0, -1.376]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.legs.geometry}
        material={materials["Material.001"]}
        position={[-1.354, 0, -1.376]}
      />
    </group>
  );
});

useGLTF.preload("/sideboard.glb");
