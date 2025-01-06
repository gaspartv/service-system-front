import TextField from "@mui/material/TextField";

export default function InputForgotPassword({ formik }: any) {
  return (
    <TextField
      id="email"
      name="email"
      variant="outlined"
      fullWidth
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
      placeholder="nome@example.com"
      sx={{
        marginBottom: "16px",
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#27272a',
          },
          '&:hover fieldset': {
            borderColor: '#27272a',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#27272a',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#27272a',
          '&.Mui-focused': {
            color: '#27272a',
          },
        },
        '& .MuiInputBase-root': {
          color: '#27272a',
        },
      }}
    />
  )
}
