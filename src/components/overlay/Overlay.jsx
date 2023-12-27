import styled from "styled-components";
import Dropzone from "./Dropzone";
import { PlusCircle, MinusCircle } from "@phosphor-icons/react";
import { useAppStore } from "../../store/appStore";

const Overlay = () => {
  const textures = [
    { type: "albedoUrl", title: "Albedo Texture" },
    { type: "roughnessUrl", title: "Roughness Texture" },
    { type: "normalsUrl", title: "Normals Texture" },
  ];
  const repeat = useAppStore((state) => state.repeat);
  const update = useAppStore((state) => state.update);

  const decrement = () => {
    if (repeat > 1) {
      update({ repeat: repeat - 1 });
    }
  };

  const increment = () => {
    if (repeat < 30) {
      update({ repeat: repeat + 1 });
    }
  };

  return (
    <>
      <ContainerSettings>
        <RepeatContainer>
          <h3>Texture repeat value</h3>
          <RepeatValue>
            <MinusCircle
              size={24}
              color="#646463"
              weight="duotone"
              onClick={decrement}
            />
            <p>{repeat}</p>
            <PlusCircle
              size={24}
              color="#646463"
              weight="duotone"
              onClick={increment}
            />
          </RepeatValue>
        </RepeatContainer>
      </ContainerSettings>
      <ContainerUpload>
        {textures.map((texture) => (
          <Dropzone
            key={texture.type}
            textureState={texture.type}
            textureTitle={texture.title}
          />
        ))}
      </ContainerUpload>
    </>
  );
};

export default Overlay;

const ContainerSettings = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  width: 25vw;
  height: 30vh;
  top: 5vh;
  left: 1vw;
  border-radius: 10px;
`;

const ContainerUpload = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  width: 25vw;
  height: 90svh;
  top: 2vh;
  right: 1vw;
`;

const RepeatValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  p {
    margin: 0;
    text-align: center;
    font-family: Garamond, serif;
    color: #7a7a7a;
    user-select: none;
  }
`;

const RepeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  gap: 1rem;
  h3 {
    margin: 0;
    text-align: center;
    font-family: Garamond, serif;
     color="#646463";
    user-select: none;
  }
`;
