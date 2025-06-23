import {Box, Grid, Typography, useTheme} from "@mui/material";

interface MenuCardProps {
  imageLeft?: boolean;
  image: string;
  title: string;
  prices: {label: string; price: string}[];
}

function MenuCard({imageLeft = true, image, title, prices}: MenuCardProps) {
  // const theme = useTheme();

  const Image = (
    <Grid item xs={12} md={6} container justifyContent="center">
      <Box component="img" src={image} alt={title} sx={{width: 180, height: 180, borderRadius: 2}} />
    </Grid>
  );

  const Info = (
    <Grid item xs={12} md={6}>
      <Typography variant="h4" align="center" sx={{color: "black", fontWeight: "bold", mb: 2}}>
        {title}
      </Typography>
      {prices.map(({label, price}, i) => (
        <Grid container key={i} justifyContent="space-between">
          <Typography variant="body1" sx={{color: "#444", fontWeight: "bold"}}>
            {label}
          </Typography>
          <Typography variant="body1" sx={{color: "#444", fontWeight: "bold"}}>
            {price}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid container spacing={8} alignItems="center" justifyContent="center" sx={{mb: 6, my: 8}}>
      {imageLeft ? (
        <>
          {Image}
          {Info}
        </>
      ) : (
        <>
          {Info}
          {Image}
        </>
      )}
    </Grid>
  );
}

export default MenuCard;
