import {Box, Typography, useTheme} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import {useTranslation} from "../LanguageContext";

function Locator() {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <Box sx={{py: 10, textAlign: "center"}}>
      <Typography variant="h4" sx={{color: theme.palette.primary.dark, fontWeight: "bold", mb: 2}}>
        {t("locator.headline")}
      </Typography>

      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", mb: 4}}>
        <RoomIcon sx={{mr: 1}} />
        <Typography variant="h6">Kleine Königstraße 11, 70178 Stuttgart</Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          height: 400,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <iframe
          title="Sakura Ramen Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.5357099039657!2d9.171227076262398!3d48.77062750971057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db3482db8a3b%3A0x676265c2a418593e!2sKleine%20K%C3%B6nigstra%C3%9Fe%2011%2C%2070178%20Stuttgart!5e0!3m2!1sen!2sde!4v1718107074453!5m2!1sen!2sde"
          width="100%"
          height="100%"
          style={{border: 0}}
          allowFullScreen
          loading="lazy"
          // referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
}

export default Locator;
