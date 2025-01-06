import TextField from "@mui/material/TextField";

export default function InputConfirmNewPassword({ formik }: any) {
  return (
      <TextField
        id="confirmNewPassword"
        name="confirmNewPassword"
        label="Confirmar senha"
        variant="outlined"
        fullWidth
        value={formik.values.confirmNewPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
        helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
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
