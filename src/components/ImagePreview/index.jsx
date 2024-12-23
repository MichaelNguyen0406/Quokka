import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

// eslint-disable-next-line react/prop-types
function ImagePreview({ imageList = [], setImageList }) {
  const handleRemoveImage = (index) => {
    imageList.splice(index, 1);
    setImageList([...imageList]);
  };

  const convertFile = (file) => {
    const imgUrl = URL.createObjectURL(file);
    return imgUrl;
  };

  return (
    <Box sx={{ borderRadius: "10px", overflow: "hidden", mb: "1rem" }}>
      <ImageList cols={imageList.length > 1 ? 2 : 1}>
        {imageList.map((file, index) => (
          <ImageListItem
            key={index}
            sx={{
              position: "relative",
            }}
          >
            <img src={convertFile(file)} />
            <IconButton
              onClick={() => handleRemoveImage(index)}
              sx={{
                position: "absolute",
                right: "0",
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default ImagePreview;
