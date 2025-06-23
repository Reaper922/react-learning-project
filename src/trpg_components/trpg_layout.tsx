import {Box, Container, Grid, Paper} from "@mui/material";
import {useGame} from "./GameContext";

// Assets und Komponenten
import {imageMap} from "../trpg_assets/imageMap";
import {locationMap} from "../trpg_assets/locationMap";
import smokeGif from "../trpg_assets/img/smoke.gif";
import Controls from "./controls";
import MonsterStats from "./monster_stats";
import GameText from "./game_text";
import StatItem from "./StatItem";

import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import PaidIcon from "@mui/icons-material/Paid";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import StyleIcon from "@mui/icons-material/Style";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ScienceIcon from "@mui/icons-material/Science";
import HardwareIcon from "@mui/icons-material/Hardware";

export default function TrpgLayout() {
  const {state} = useGame();
  const locKey = state.location.toLowerCase();
  const loc = locationMap[locKey];

  const buttons = state.buttons ?? [{label: "Error", action: () => {}}];

  const {health, xp, gold, arrows, wolfFur, pigFur, weapon, hasBow, hasPotion, gameText, monster} = state;
  const pictureSrc = loc?.imageKey ? imageMap[loc.imageKey] : undefined;

  const allPlayerStats = [
    // Core Stats
    {icon: FavoriteIcon, label: "Leben", value: health},
    {icon: StarIcon, label: "XP", value: xp},
    {icon: PaidIcon, label: "Gold", value: gold},
    {icon: HardwareIcon, label: "Waffe", value: weapon},

    // Loot
    {icon: StyleIcon, label: "Wolfsfelle", value: wolfFur},
    {icon: StyleIcon, label: "Wildschweinfelle", value: pigFur},

    // Fernkampf
    {icon: GpsFixedIcon, label: "Bogen", value: hasBow ? "Ja" : "Nein"},
    {icon: NorthEastIcon, label: "Pfeile", value: arrows},

    // Consumables
    {icon: ScienceIcon, label: "Rettungstrank", value: hasPotion ? "Ja" : "Nein"},
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        backgroundImage: `url(${smokeGif})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Linke Spalte: Player Stats */}
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              {allPlayerStats.map((stat) => (
                <Grid item xs={6} key={stat.label}>
                  <StatItem icon={stat.icon} label={stat.label} value={stat.value} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Mittlere Spalte: Bild (unverändert) */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={pictureSrc}
              alt="Szene"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            />
          </Grid>

          {/* Rechte Spalte: Monster Stats (jetzt mit `monster` aus dem Context) */}
          <Grid item xs={12} md={3}>
            {monster && (
              <Paper>
                <MonsterStats name={monster.name} hp={monster.health} />
              </Paper>
            )}
          </Grid>

          {/* Untere Reihe: Controls und GameText */}
          <Grid item xs={12} md={9} sx={{mt: 1}}>
            <GameText text={gameText} />
          </Grid>
          <Grid item xs={12} md={3} sx={{mt: 1}}>
            {/* Controls nutzen jetzt die Updater-Funktionen aus dem Context */}
            <Controls buttons={buttons} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
