import { Checkbox, FormControlLabel } from "@mui/material";

export default function InputCheckboxSave({ handleCheckboxChange, formik, checkbox }: any) {
  return (
    <FormControlLabel
      label="Lembre-se de mim"
      onChange={(e: any) => {
        const checked = e.target.checked;
        handleCheckboxChange(checked, formik.values).then((r: any) => r);
      }}
      control={
        <Checkbox
          checked={checkbox}
          sx={{
            color: '#d1d5db',
            '&.Mui-checked': {
              color: '#d1d5db',
            },
          }}
        />
      }
    />
  )
}