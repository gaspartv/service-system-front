import TextField from "@mui/material/TextField";

export default function InputNewPassword({ formik }: any) {
  return (
      <TextField
        id="newPassword"
        name="newPassword"
        label="Nova senha"
        variant="outlined"
        fullWidth
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
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
