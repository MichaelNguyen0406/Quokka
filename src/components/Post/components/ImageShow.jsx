import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

/* eslint-disable react/prop-types */
function ImageShow({ imageURLs = [] }) {
  if (!imageURLs.length) {
    return <Typography>No images to display</Typography>;
  }

  const gridStyles = () => {
    switch (imageURLs.length) {
      case 1:
        return {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto",
        };
      case 2:
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto",
        };
      case 3:
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
        };
      default:
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
        };
    }
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        overflow: "hidden",
        display: "grid",
        ...gridStyles(),
        gap: "3px",
      }}
    >
      {imageURLs.map((image, index) => (
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            gridRow: imageURLs.length == 3 && index == 0 ? "1/3" : "",
          }}
          key={index}
          src={image}
        />
      ))}
    </Box>
  );
}

export default ImageShow;
