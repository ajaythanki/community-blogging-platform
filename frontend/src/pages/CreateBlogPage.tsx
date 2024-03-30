import { Autocomplete, Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import FileInput from "../components/FileInput";
import { categories } from "../constants";
import { useCreateBlogMutation } from "../redux/features/blog/hooks/useBlog";
const CreateBlogPage = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const initialValues = {
    title: "",
    description: "",
    category: "",
    tags: [],
    thumbnail: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Blog title is required"),
    description: yup.string().required("Blog Description is required"),
    tags: yup
      .array()
      .min(1, "Minimum one tag is required")
      .required("Tags is required"),
    category: yup.string().required("Category is required"),
    thumbnail: yup.mixed().nullable(),
  });

  const { mutateAsync, isPending } = useCreateBlogMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
        mutateAsync(values);
        console.log("Form submitted:", values);
      // formik.resetForm();
    },
  });

  console.log("formik.values",formik.values);
  console.log("formik.errors",formik.errors);

  return (
    <Container maxWidth={"sm"} sx={{ pt: 0, minWidth: "500px" }}>
      <Box
        component={"form"}
        sx={{ width: "100%" }}
        onSubmit={formik.handleSubmit}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="gray"
        >
          Create A Blog
        </Typography>
        <Box>
          <FileInput formik={formik} isLoading={isPending}/>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label={"Blog Title"}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              disabled={isPending}
              error={
                formik.touched.title && Boolean(formik.errors.title)
              }
              helperText={
                formik.touched.title && formik.errors.title
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              margin="normal"
              variant="outlined"
              multiline
              disabled={isPending}
              fullWidth
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="category-select">Select Category</InputLabel>
              <Select
                fullWidth
                value={formik.values.category}
                disabled={isPending}
                id="category"
                name="category"
                label="Select Category"
                labelId="category-select"
                onChange={(e) => {
                  const val = e.target.value;
                  !/^\s/.test(val) &&
                    formik.setFieldValue(
                      "category",
                      val.replace(/[^ a-zA-Z0-9]/g, ""),
                    );
                }}
                inputProps={{ placeholder: "Select Category" }}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                {categories &&
                  categories?.length > 0 &&
                  categories.map((category: string, indx) => (
                    <MenuItem value={category} key={"category" + indx}>
                      {category}
                    </MenuItem>
                  ))}
              </Select>
              {formik.touched.category && Boolean(formik.errors.category) && (
                <FormHelperText sx={{ color: "#ed4a49" }}>
                  {formik.errors.category}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{ mb: 2 }}
              multiple
              disabled={isPending}
              options={formik.values.tags ? formik.values.tags : []}
              freeSolo
              onChange={(_, value: any) => {
                const newVal = value.filter((item: any) =>
                  item.replace(/\s+/g, ""),
                );
                !/^\s/.test(value) && formik.setFieldValue("tags", newVal);
              }}
              id="multiple-limit-tags"
              value={formik?.values?.tags}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    label="Tags"
                    name={"tags"}
                    value={formik?.values?.tags}
                    error={
                      formik.touched.tags && Boolean(formik.errors.tags)
                    }
                    helperText={formik.touched.tags && formik.errors.tags}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      ml: 2,
                    }}
                  >
                    <Typography variant="caption">
                      Hit an enter to create a tag
                    </Typography>
                  </Box>
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="primary" fullWidth 
              disabled={isPending}
              variant="contained">
              {isPending ? "Submiting..." : "SUBMIT"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateBlogPage;