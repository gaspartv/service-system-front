import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function InputPassword({formik, showPassword, setShowPassword }: any) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <FormControl
        variant="outlined"
        fullWidth
        sx={{
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
            ...(formik.touched.password && formik.errors.password && {
              color: '#ef4444',
            }),
          },
          '& .MuiInputBase-root': {
            color: 'white',
          },
        }}
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Senha
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide the password" : "display the password"}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((show: any) => !show);
                }}
                edge="end"
                className="text-gray-300"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>
    </div>
  )
}
