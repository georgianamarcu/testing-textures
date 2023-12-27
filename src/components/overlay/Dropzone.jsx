/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useAppStore } from "../../store/appStore";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const createImageUrl = (buffer, type) => {
  const blob = new Blob([buffer], { type });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
};

const Dropzone = ({ textureState, textureTitle }) => {
  const update = useAppStore((state) => state.update);
  const imagePreview = useAppStore((state) => state[textureState]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const { type } = file;

    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const buffer = await file.arrayBuffer();
        const textureUrl = createImageUrl(buffer, type);
        update({ [textureState]: textureUrl });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] }, onDrop });

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <Title>{textureTitle}</Title>
        <input {...getInputProps()} />
        <StyledText>
          Drag and drop some files here, or click to select files
        </StyledText>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "90px" }}
          />
        )}
      </Container>
    </div>
  );
};

export default Dropzone;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  padding: 10px;
  border-width: 2px;
  border-radius: 20px;
  border-color: ${(props) => getColor(props)};
  border-style: double;
  background-color: #fcfdff;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const StyledText = styled.p`
  font-family: Garamond, serif;
  font-size: 14px;
  color: #bdbdbd;
`;

const Title = styled.h2`
  font-family: Garamond, serif;
  font-size: 20px;
  color: #bdbdbd;
`;
