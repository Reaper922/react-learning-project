import {Box} from "@mui/material";
import saklogo from "../assets/img/saklogo.png";
import fbIcon from "../assets/img/fb.png";
import instaIcon from "../assets/img/ins.png";
import tripadIcon from "../assets/img/tripad.png";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
        flexWrap: "wrap",
      }}
    >
      {/* Nur das Logo links */}
      <Box>
        <Box component="img" src={saklogo} alt="Sakura Ramen Logo" sx={{height: 40}} />
      </Box>

      {/* Social Icons rechts */}
      <Box sx={{display: "flex", gap: 2}}>
        <Box component="img" src={fbIcon} alt="Facebook" sx={{height: 30, width: 30, cursor: "pointer"}} />
        <Box component="img" src={instaIcon} alt="Instagram" sx={{height: 30, width: 30, cursor: "pointer"}} />
        <Box component="img" src={tripadIcon} alt="Tripadvisor" sx={{height: 30, width: 30, cursor: "pointer"}} />
      </Box>
    </Box>
  );
}

export default Footer;
