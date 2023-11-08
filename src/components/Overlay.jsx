import styled from "styled-components";
import SvgIcon from "./SvgIcon";

// eslint-disable-next-line react/prop-types
const Overlay = ({ setSmallSofa }) => {
  return (
    <ContainerOverlay>
      <SvgIcon size={28} setSmallSofa={setSmallSofa} toggle={false} />
      <SvgIcon size={24} setSmallSofa={setSmallSofa} toggle={true} />
    </ContainerOverlay>
  );
};

export default Overlay;

const ContainerOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 12vw;
  height: 6vh;
  bottom: 2vh;
  right: 2vw;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.17);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;
