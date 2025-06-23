import {Box, Typography} from "@mui/material";

type Props = {
  name: string;
  hp: number;
};

export default function MonsterStats({name, hp}: Props) {
  return (
    <Box sx={{mt: 2}}>
      <Typography variant="body1">
        Monster Name: <strong>{name}</strong>
      </Typography>
      <Typography variant="body1">
        HP: <strong>{hp}</strong>
      </Typography>
    </Box>
  );
}
