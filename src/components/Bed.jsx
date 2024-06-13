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

export const Bed = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/full-bed.glb");
  const albedoUrl = useAppStore((state) => state.albedoUrl);
  const roughnessUrl = useAppStore((state) => state.roughnessUrl);
  const normalsUrl = useAppStore((state) => state.normalsUrl);
  const repeat = useAppStore((state) => state.repeat);
  const enableRandom = useAppStore((state) => state.enableRandom);
  const useNoiseMap = useAppStore((state) => state.useNoiseMap);
  const useSuslikMethod = useAppStore((state) => state.useSuslikMethod);
  const debugNoise = useAppStore((state) => state.debugNoise);

  const sofa = useRef();
  const standardMaterial = new MeshStandardMaterial();

  //**RANDOM UV SHADER */
  const textureLoader = useMemo(() => new TextureLoader(), []);

  useEffect(() => {
    const sofaMesh = sofa.current;
    if (!sofaMesh) return;

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

            if (!sofaMesh.material[mapType]) {
              sofaMesh.material[mapType] = new Texture();
            }

            sofaMesh.material[mapType].dispose();
            sofaMesh.material[mapType] = texture;
            sofaMesh.material.needsUpdate = true;
          },
          undefined,
          (error) => {
            console.error("Texture load error:", error);
          }
        );
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
  }, [
    albedoUrl,
    roughnessUrl,
    normalsUrl,
    repeat,
    sofa,
    enableRandom,
    useNoiseMap,
    useSuslikMethod,
    debugNoise,
  ]);

  return (
    <group ref={ref} {...props} dispose={null} rotation={[0, 0.5, 0]}>
      <mesh geometry={nodes.leg.geometry} material={materials.Black} />
      <mesh
        geometry={nodes["Bedroom_Beds_Shloff-Headboard-Grand_02"].geometry}
        material={materials.Black}
      />
      <mesh geometry={nodes.coffre.geometry} material={standardMaterial} />
      <mesh
        ref={sofa}
        geometry={nodes.bed.geometry}
        material={standardMaterial}
      />
      <mesh
        geometry={
          nodes["Bedroom_Beds_Shloff-Headboard-Grand_02_bedding"].geometry
        }
        material={materials["Fabric White Bed"]}
      />
      <mesh
        geometry={
          nodes["Bedroom_Beds_Shloff-Headboard-Grand_02_bedding_1"].geometry
        }
        material={materials.duvet}
      />
    </group>
  );
});

useGLTF.preload("/full-bed.glb");
