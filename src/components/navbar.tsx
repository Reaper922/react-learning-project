import {Box, AppBar, Toolbar, Typography, Button, IconButton} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import sakuraImg from "../assets/img/saku.png";
import Grid from "@mui/material/Grid";
import {useTranslation} from "../LanguageContext";
import flagDe from "../assets/img/flag-de.png";
import flagEn from "../assets/img/flag-gb.png";

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({behavior: "smooth"});
  }
}

function Navbar() {
  const {language, setLanguage, t} = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  const navItems = [
    {label: t("navbar.menu"), target: "our-menu"},
    {label: t("navbar.location"), target: "locator"},
    {label: t("navbar.about"), target: "footer"},
  ];

  return (
    <AppBar
      position="sticky" // Wichtig: position="sticky" für die AppBar
      sx={{
        top: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        // padding wird oft durch die Toolbar oder innere Elemente geregelt
        // py: 1, // Kannst du hier entfernen, oder in der Toolbar anwenden
      }}
    >
      <Toolbar disableGutters>
        <Grid container alignItems="center" justifyContent="space-between" px={4}>
          {/* Logo */}
          <Grid item>
            <Box component="img" src={sakuraImg} alt="Logo" sx={{height: 40}} />
          </Grid>

          {/* Navigation Links */}
          <Grid item>
            <Grid container spacing={4}>
              {navItems.map((item) => (
                <Grid item key={item.target}>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": {textDecoration: "underline"},
                    }}
                    onClick={() => scrollToId(item.target)}
                  >
                    {item.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Phone + Language Toggle */}
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#cc0000",
                    },
                  }}
                  startIcon={<PhoneIcon />}
                  href="tel:017654564534"
                >
                  0176 54564534
                </Button>
              </Grid>
              <Grid item>
                <IconButton onClick={toggleLanguage}>
                  <Box
                    component="img"
                    src={language === "en" ? flagDe : flagEn}
                    alt="Toggle language"
                    sx={{width: 32, height: 20, borderRadius: 1}}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
