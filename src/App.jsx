import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { Loader, useGLTF, Stage } from "@react-three/drei";
import Controls from "./components/Controls";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextureLoader, sRGBEncoding, RepeatWrapping } from "three";

const AppContext = createContext({});

const createImageUrl = (buffer, type) => {
  const blob = new Blob([buffer], { type });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
};

function App() {
  const [textureUrl, setTextureUrl] = useState(null);
  const getTextureFile = async (e) => {
    const file = e.target.files[0];
    const { type } = file;
    const buffer = await file.arrayBuffer();
    const imageUrl = createImageUrl(buffer, type);
    setTextureUrl(imageUrl);
  };
  return (
    <AppContext.Provider value={{ textureUrl }}>
      <Canvas dpr={[1, 2]}>
        <Stage adjustCamera preset="rembrandt" intensity={0.6}>
          <Suspense fallback={null}>
            <Headboard />
          </Suspense>
        </Stage>
        <Controls />
      </Canvas>
      <Overlay getTextureFile={getTextureFile} />
      <Loader />
    </AppContext.Provider>
  );
}

function Headboard() {
  const { scene } = useGLTF("/Madison_rechte_6cm.glb");
  const mesh = useRef();
  const material = useRef();
  const { textureUrl } = useContext(AppContext);
  useEffect(() => {
    if (textureUrl) {
      const textureLoader = new TextureLoader();
      textureLoader.load(textureUrl, (texture) => {
        texture.encoding = sRGBEncoding;
        texture.flipY = false;
        texture.repeat.set(5, 5);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;

        const model = scene.children[0];
        if (model.material.map) {
          model.material.map.dispose();
        }
        model.material.map = texture;
        model.material.needsUpdate = true;
      });
    }
  }, [textureUrl]);
  return <primitive object={scene}></primitive>;
}

function Overlay({ getTextureFile }) {
  return (
    <ContainerOverlay>
      <Text>Upload your texture:</Text>
      <input type="file" onChange={(e) => getTextureFile(e)} />
    </ContainerOverlay>
  );
}

export default App;

const ContainerOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 40vw;
  height: 6vh;
  bottom: 2vh;
  right: 2vw;
  border-radius: 10px;
  background: rgba(158, 190, 230, 0.608);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const Text = styled.p`
  color: #000;
  font-weight: 100;
  font-size: 0.9rem;
`;

useGLTF.preload("/Madison_rechte_6cm.glb");
