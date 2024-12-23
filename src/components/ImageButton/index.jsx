import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// eslint-disable-next-line react/prop-types
function ImageButton({ onChange }) {
  return (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      sx={{
        minWidth: "20px",
        color: "inherit",
      }}
    >
      <InsertPhotoIcon />
      <VisuallyHiddenInput type="file" multiple onChange={onChange} />
    </Button>
  );
}

export default ImageButton;
