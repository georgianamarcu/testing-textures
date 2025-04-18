import styled from "styled-components";
import Dropzone from "./Dropzone";
import { PlusCircle, MinusCircle } from "@phosphor-icons/react";
import { useAppStore } from "../../store/appStore";
// import Select from "./Select";

const Overlay = () => {
  const textures = [
    { type: "albedoUrl", title: "Albedo Texture" },
    { type: "roughnessUrl", title: "Roughness Texture" },
    { type: "normalsUrl", title: "Normals Texture" },
  ];
  const repeat = useAppStore((state) => state.repeat);
  const update = useAppStore((state) => state.update);

  // const intensity = useAppStore((state) => state.lightIntensity);
  // const enableRandom = useAppStore((state) => state.enableRandom);
  // const useNoiseMap = useAppStore((state) => state.useNoiseMap);
  // const useSuslikMethod = useAppStore((state) => state.useSuslikMethod);
  // const debugNoise = useAppStore((state) => state.debugNoise);

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

  // const presets = ["rembrandt", "portrait", "upfront", "soft"];

  // const updateCheckboxState = (property, value) => {
  //   update({ [property]: value });
  // };

  return (
    <>
      <ChangeModelContainer>
        <ImageContainer>
          <ImageSelect
            src="/bed.webp"
            alt="bed"
            onClick={() => update({ selectedModel: "bed" })}
          />
        </ImageContainer>
        <ImageContainer>
          <ImageSelect
            src="/chair.webp"
            alt="chair"
            onClick={() => update({ selectedModel: "chair" })}
          />
        </ImageContainer>
        <ImageContainer>
          <ImageSelect
            src="/sideboard.webp"
            alt="sideboard"
            onClick={() => update({ selectedModel: "sideboard" })}
          />
        </ImageContainer>
      </ChangeModelContainer>
      <ContainerSettings>
        <RepeatContainer>
          <h3>Texture repeat value</h3>
          <RepeatValue>
            <MinusCircle
              size={24}
              color="#5F5F60"
              weight="thin"
              onClick={decrement}
            />
            <p>{repeat}</p>
            <PlusCircle
              size={24}
              color="#5F5F60"
              weight="thin"
              onClick={increment}
            />
          </RepeatValue>
        </RepeatContainer>
        {/* <PresetsContainer>
          <h3>Stage lights presets</h3>
          <Select
            label="rembrandt"
            values={presets}
            onChange={(v) => update({ stagePreset: v })}
          />
        </PresetsContainer> */}
        {/* <SliderContainer>
          <SliderText>
            Light intensity <SliderSpan />
          </SliderText>
          <SliderInput
            onChange={(e) => update({ lightIntensity: e.target.value })}
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={intensity}
          />
        </SliderContainer> */}
        {/* <Checkboxes>
          <CheckboxDiv>
            <CheckboxInput
              type="checkbox"
              id="randomUVs"
              name="randomUVs"
              checked={enableRandom === 1 ? true : false}
              onChange={() =>
                updateCheckboxState("enableRandom", enableRandom === 1 ? 0 : 1)
              }
            />
            <label htmlFor="enableRandomUV">Enable Random Uvs</label>
          </CheckboxDiv>
          <CheckboxDiv>
            <CheckboxInput
              type="checkbox"
              id="useNoiseMap"
              name="useNoiseMap"
              checked={useNoiseMap === 1 ? true : false}
              onChange={() =>
                updateCheckboxState("useNoiseMap", useNoiseMap === 1 ? 0 : 1)
              }
            />
            <label htmlFor="useNoiseMap">Use Noise Map</label>
          </CheckboxDiv>
          <CheckboxDiv>
            <CheckboxInput
              type="checkbox"
              id="useSuslikMethod"
              name="useSuslikMethod"
              checked={useSuslikMethod === 1 ? true : false}
              onChange={() =>
                updateCheckboxState(
                  "useSuslikMethod",
                  useSuslikMethod === 1 ? 0 : 1
                )
              }
            />
            <label htmlFor="useSuslikMethod">Use Blending Method</label>
          </CheckboxDiv>
          <CheckboxDiv>
            <CheckboxInput
              type="checkbox"
              id="debugNoise"
              name="debugNoise"
              checked={debugNoise === 1 ? true : false}
              onChange={() =>
                updateCheckboxState("debugNoise", debugNoise === 1 ? 0 : 1)
              }
            />
            <label htmlFor="debugNoise">Debug Noise</label>
          </CheckboxDiv>
        </Checkboxes> */}
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
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 25vw;
  height: 3vh;
  padding: 1rem;
  bottom: 10vh;
  left: 1vw;
  border-radius: 10px;
  background-color: rgba(207, 214, 221, 0.84);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const ContainerUpload = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  width: 25vw;
  height: 60svh;
  top: 0;
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
    font-family: Tahoma, sans-serif;
    color: rgba(95, 95, 96, 0.84);
    user-select: none;
  }
`;

const RepeatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  h3 {
    margin: 0;
    text-align: center;
    font-family: Tahoma, sans-serif;
    color: rgba(95, 95, 96, 0.84);
    user-select: none;
    font-size: 0.8rem;
  }
`;

// const PresetsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   gap: 1rem;
//   h3 {
//     margin: 0;
//     text-align: center;
//     font-family: Tahoma, sans-serif;
//     color: #292929;
//     user-select: none;
//     font-size: 0.8rem;
//   }
// `;

// const SliderContainer = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
// const SliderInput = styled.input`
//   -webkit-appearance: none;
//   width: 60%;
//   height: 12px;
//   border-radius: 5px;
//   background: #d3d3d3;
//   outline: none;
//   opacity: 0.7;
//   &:hover {
//     opacity: 1;
//   }
//   -webkit-transition: 0.2s;
//   transition: opacity 0.2s;
//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background: #292929;
//     cursor: pointer;
//   }
//   &::-moz-range-thumb {
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background: #292929;
//     cursor: pointer;
//   }
// `;
// const SliderText = styled.p`
//   font-family: Tahoma, sans-serif;
//   color: #292929;
//   font-size: 0.8rem;
//   font-weight: bold;
// `;
// const SliderSpan = styled.span``;

// const Checkboxes = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: auto;
//   justify-items: start;
//   gap: 0.5rem;
// `;

// const CheckboxDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   label {
//     font-family: Tahoma, sans-serif;
//     color: #292929;
//     user-select: none;
//     font-size: 0.8rem;
//   }
// `;

// const CheckboxInput = styled.input``;

const ChangeModelContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 10vw;
  height: 40vh;
  padding: 1rem;
  top: 2vh;
  left: 1vw;
  border-radius: 10px;
  background-color: rgba(207, 214, 221, 0.84);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 300ms ease-in-out;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const ImageSelect = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
