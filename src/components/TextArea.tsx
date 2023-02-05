import TextField, { TextFieldProps } from "@mui/material/TextField";

export function TextArea(props: TextFieldProps) {
  return <TextField {...props} multiline variant="outlined" />;
}
