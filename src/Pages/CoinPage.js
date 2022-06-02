import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom';
import { SingleCoin } from "../config/api";
import {  Button, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import ReactHtmlParser from "react-html-parser"; 
import { CryptoState } from "../CryptoContext";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
const {user, watchlist,
  
  setAlert} = CryptoState();
  const fetchCoin = async () => {

    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }; 

  
  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  useEffect(() => {
    fetchCoin();
  }, []);

const useStyles = makeStyles((theme) => ({
  container:{
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
    sideinfo: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid #ea822b",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
  
}));



const classes = useStyles();



  return (
<div className={classes.container}>
<div className={classes.sideinfo}>
<img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h2" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.Data}>
          <span style={{display:"flex"}}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
        
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }} >
                 {coin?.market_data.current_price.usd}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
            Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
                {coin?.market_data.market_cap.usd}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#ea822b",
                fontWeight:   700,
                fontFamily: "Montserrat",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              >
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}

        </div>
</div>
{/**chart */}
<CoinInfo coin={coin} />
 
</div>
  )
};

export default CoinPage;