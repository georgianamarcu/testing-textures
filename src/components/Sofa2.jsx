import { useGLTF } from "@react-three/drei";

const Sofa2 = () => {
  const { scene } = useGLTF("/model_34.glb");
  return (
    <primitive object={scene} scale={0.6} position={[-1.2, -0.89, -0.8]} />
  );
};

export default Sofa2;

useGLTF.preload("/model_34.glb");
