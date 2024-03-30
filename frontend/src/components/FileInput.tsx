import { Box, Button } from "@mui/material";
import { useState, useRef } from "react";
import fallbackImage from "../assets/default-fallback-image.png";

const FileInput = ({formik}: any) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      formik.setFieldValue("thumbnail", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue("file", null);
      formik.setFieldValue("url", "");
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {imageUrl && formik.values.thumbnail ? (
        <Box mt={2} textAlign="center">
          <img
            src={imageUrl}
            alt={formik?.values?.thumbnail?.name}
            style={{ width: "100%", height: "100%", maxHeight: "300px", objectFit: "contain", cursor: "pointer" }}
            onClick={handleImageClick}
          />
        </Box>
      ) : (
        <Box>
          <img
            src={fallbackImage}
            style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "pointer" }}
            alt="blog image"
            onClick={handleImageClick}
          />
        </Box>
      )}
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
    </>
  );
};

export default FileInput;
