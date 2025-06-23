import {Typography} from "@mui/material";

type Props = {
  text: string;
};

export default function GameText({text}: Props) {
  return (
    <Typography variant="body1" sx={{mt: 2, whiteSpace: "pre-line"}}>
      {text}
    </Typography>
  );
}
