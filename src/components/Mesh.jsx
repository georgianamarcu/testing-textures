import { useRef, useEffect } from "react";
import { useAppStore } from "../store/appStore";
import { useGLTF } from "@react-three/drei";
import {
  TextureLoader,
  SRGBColorSpace,
  LinearSRGBColorSpace,
  RepeatWrapping,
} from "three";

const Mesh = () => {
  const albedoUrl = useAppStore((state) => state.albedoUrl);
  const roughnessUrl = useAppStore((state) => state.roughnessUrl);
  const normalsUrl = useAppStore((state) => state.normalsUrl);
  const repeat = useAppStore((state) => state.repeat);

  const { scene } = useGLTF("/cube.glb");

  useEffect(() => {
    const model = scene.children[0];
    if (albedoUrl) {
      const textureLoader = new TextureLoader();
      textureLoader.load(albedoUrl, (texture) => {
        texture.colorSpace = SRGBColorSpace;
        texture.flipY = false;
        texture.repeat.set(repeat, repeat);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;

        if (model.material.map) {
          model.material.map.dispose();
        }
        model.material.map = texture;
        model.material.needsUpdate = true;
      });
    }
    if (roughnessUrl) {
      const textureLoader = new TextureLoader();
      textureLoader.load(roughnessUrl, (texture) => {
        texture.colorSpace = LinearSRGBColorSpace;
        texture.flipY = false;
        texture.repeat.set(repeat, repeat);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;

        if (model.material.roughnessMap) {
          model.material.roughnessMap.dispose();
        }
        model.material.roughnessMap = texture;
        model.material.needsUpdate = true;
      });
    }
    if (normalsUrl) {
      const textureLoader = new TextureLoader();
      textureLoader.load(normalsUrl, (texture) => {
        texture.colorSpace = LinearSRGBColorSpace;
        texture.flipY = false;
        texture.repeat.set(repeat, repeat);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;

        if (model.material.normalMap) {
          model.material.normalMap.dispose();
        }
        model.material.normalMap = texture;
        model.material.needsUpdate = true;
      });
    }
  }, [albedoUrl, roughnessUrl, normalsUrl, scene.children, repeat]);

  return <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />;
};

export default Mesh;

useGLTF.preload("/cube.glb");
