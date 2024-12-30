import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

/* eslint-disable react/prop-types */
function ImageShow({ imageURLs = [] }) {
  if (!imageURLs.length) {
    return <Typography>No images to display</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {imageURLs.map((image, index) => (
        <img width="100%" key={index} src={image} />
      ))}
    </Box>
  );
}

export default ImageShow;
