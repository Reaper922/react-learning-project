import {Button, Stack, styled} from "@mui/material";

const StyledButton = styled(Button)(({theme}) => ({
  color: "#ffffff",
  backgroundColor: "rgba(110, 20, 20, 0.65)",
  border: "1px solid rgba(255, 150, 150, 0.4)",
  backdropFilter: "blur(4px)",
  fontFamily: "serif",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: theme.spacing(1, 3),
  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",

  "&:hover": {
    backgroundColor: "rgba(140, 30, 30, 0.85)",
    borderColor: "rgba(255, 150, 150, 0.8)",
    boxShadow: "0 0 10px rgba(255, 100, 100, 0.5)",
  },

  "&:active": {
    transform: "scale(0.98)",
  },
}));

type ButtonConfig = {
  label: string;
  action: () => void; // passt zum GameButton
};

type Props = {
  buttons: ButtonConfig[];
};

export default function Controls({buttons}: Props) {
  return (
    <Stack direction="column" spacing={1}>
      {buttons.map((btn, index) =>
        btn.label ? (
          <StyledButton key={index} onClick={btn.action}>
            {btn.label}
          </StyledButton>
        ) : null
      )}
    </Stack>
  );
}
