import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import bowlIcon from "../assets/img/bowl_icon.jpg";
import brothIcon from "../assets/img/broth_icon.png";
import eggsIcon from "../assets/img/eggs_icon.jpg";
import {useTranslation} from "../LanguageContext";

function HowToOrder() {
  const {t} = useTranslation();

  return (
    <Box sx={{pt: 10, pb: 10}}>
      <Typography variant="h3" align="center" gutterBottom sx={{color: "darkred", fontWeight: "bold"}}>
        {t("how_to_order.headline")}
      </Typography>

      <Grid container justifyContent="center" spacing={20}>
        {[
          {img: bowlIcon, text: `${t("how_to_order.pick")}\n${t("how_to_order.your_noodle")}`},
          {img: brothIcon, text: `${t("how_to_order.pick")}\n${t("how_to_order.your_broth")}`},
          {img: eggsIcon, text: `${t("how_to_order.Add")}\n${t("how_to_order.your_toppings")}`},
        ].map((step, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 2,
                backgroundImage: `url(${step.img})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                marginBottom: 2,
              }}
            />
            <Typography align="center" sx={{whiteSpace: "pre-line", fontWeight: "bold"}}>
              {step.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HowToOrder;
