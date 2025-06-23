import {Typography, Paper} from "@mui/material";
import type {SvgIconComponent} from "@mui/icons-material";
import type {ReactNode} from "react";

interface StatItemProps {
  icon: SvgIconComponent;
  label: string;
  value: ReactNode;
}

export default function StatItem({icon: Icon, label, value}: StatItemProps) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 1.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        // "Glassmorphism"-Effekt
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Icon sx={{fontSize: 32, mb: 0.5, color: "#ffc107"}} /> {/* Goldene Icons */}
      <Typography variant="body2" sx={{fontWeight: "bold", textShadow: "0 0 4px black"}}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{textShadow: "0 0 6px black"}}>
        {value}
      </Typography>
    </Paper>
  );
}
