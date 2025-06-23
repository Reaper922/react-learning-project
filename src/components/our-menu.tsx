import {Box, Container, Typography} from "@mui/material";
import MenuCard from "./menu-cards";
import img1 from "../assets/img/r1.png";
import img2 from "../assets/img/r2.png";
import img3 from "../assets/img/r3.png";
import background from "../assets/img/background.jpg";
import {useTranslation} from "../LanguageContext";

function OurMenu() {
  const {t} = useTranslation();

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 10,
        }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{color: "darkred", fontWeight: "bold"}}>
          {t("our_menu.headline")}
        </Typography>
        <Container>
          <MenuCard
            image={img1}
            title="Tonkasu Ramen"
            prices={[
              {label: `${t("our_menu.chicken")}`, price: "11.95€"},
              {label: `${t("our_menu.beef")}`, price: "12.95€"},
              {label: `${t("our_menu.shrimp")}`, price: "13.95€"},
            ]}
          />
          <MenuCard
            imageLeft={false}
            image={img2}
            title="Spicy Miso Ramen"
            prices={[
              {label: `${t("our_menu.chicken")}`, price: "11.95€"},
              {label: `${t("our_menu.beef")}`, price: "12.95€"},
              {label: `${t("our_menu.shrimp")}`, price: "13.95€"},
            ]}
          />
          <MenuCard
            image={img3}
            title="Shio Ramen"
            prices={[
              {label: `${t("our_menu.chicken")}`, price: "11.95€"},
              {label: `${t("our_menu.beef")}`, price: "12.95€"},
              {label: `${t("our_menu.shrimp")}`, price: "13.95€"},
            ]}
          />
        </Container>
      </Box>
    </>
  );
}

export default OurMenu;
