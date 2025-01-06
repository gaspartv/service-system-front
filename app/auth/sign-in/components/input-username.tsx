import TextField from "@mui/material/TextField";

export default function InputUsername({ formik }: any) {
  return (
      <TextField
        id="username"
        name="username"
        label="E-mail ou número de celular"
        variant="outlined"
        fullWidth
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{
          marginBottom: "16px",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
            '&.Mui-focused': {
              color: 'white',
            },
          },
          '& .MuiInputBase-root': {
            color: 'white',
          },
        }}
      />
  )
}
