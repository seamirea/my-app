import React from 'react';
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from './Carousel';

const useStyles=makeStyles(() => ({
banner:{
    backgroundImage: "url(./banner2.jpg)",
},
bannerContent: {
    height: 450,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
<Container className={classes.bannerContent}>
<div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Investment & Business
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Track, get, exchange and earn from your crypto currency
          </Typography>
        </div>
        <Carousel />
</Container>
    </div>
  )
}

export default Banner