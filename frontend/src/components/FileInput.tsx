import { Box, Button, FormHelperText } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import fallbackImage from "../assets/default-fallback-image.png";

const FileInput = ({formik, isLoading}: any) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if(file.size > 200 * 1024){
        formik.setFieldError("thumbnail","File size exceeds 200KB limit");
      }else{
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      formik.setFieldValue("thumbnail", "");
    }
    
  };

  useEffect(()=>{
    // imageUrl
    if(imageUrl) formik.setFieldValue("thumbnail", imageUrl);

  },[imageUrl]);

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
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "300px",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
          />
        </Box>
      ) : (
        <Box>
          <img
            src={fallbackImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              cursor: "pointer",
            }}
            alt="blog image"
            onClick={handleImageClick}
          />
        </Box>
      )}
      <input
        accept="image/*"
        disabled={isLoading}
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {formik.touched.thumbnail && Boolean(formik.errors.thumbnail) && (
        <FormHelperText sx={{ color: "#ed4a49" }}>
          {formik.errors.thumbnail}
        </FormHelperText>
      )}
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" disabled={isLoading} component="span">
          Upload Image
        </Button>
      </label>
    </>
  );
};

export default FileInput;
