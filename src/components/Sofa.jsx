import { useGLTF } from "@react-three/drei";

const Sofa = () => {
  const { scene } = useGLTF("/model_32.glb");
  return (
    <primitive object={scene} scale={0.6} position={[-0.2, -0.89, -0.8]} />
  );
};

export default Sofa;

useGLTF.preload("/model_32.glb");
