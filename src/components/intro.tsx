import {Box, Typography} from "@mui/material";
import background from "../assets/img/bgr1.jpg";
// import {useTheme} from "@mui/material/styles";
import {useTranslation} from "../LanguageContext";

function Intro() {
  // const theme = useTheme();
  const {t} = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{color: "white", fontWeight: "bold"}}>
        SAKURA RAMEN
      </Typography>
      <Typography variant="h5" sx={{color: "white", mt: 2}}>
        {t("intro.text")}
      </Typography>
    </Box>
  );
}

export default Intro;
