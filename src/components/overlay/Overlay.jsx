import styled from "styled-components";
import Dropzone from "./Dropzone";

const Overlay = () => {
  const textures = [
    { type: "albedoUrl", title: "Albedo Texture" },
    { type: "roughnessUrl", title: "Roughness Texture" },
    { type: "normalsUrl", title: "Normals Texture" },
  ];
  return (
    <>
      {/* <ContainerSettings></ContainerSettings> */}
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
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 25vw;
  height: 50vh;
  bottom: 2vh;
  right: 1vw;
  border-radius: 10px;
  background: rgba(158, 190, 230, 0.608);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const ContainerUpload = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  gap: 1.5rem;
  width: 25vw;
  height: 90svh;
  top: 2vh;
  right: 1vw;
`;
