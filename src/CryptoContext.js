import axios from 'axios';
import React, {createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";


const Crypto = createContext()

const  CryptoContext= ({children}) => {
    const[coins, setCoins] = useState([]);
    const[loading, setLoading] = useState(false);
  const[currency, setCurrency] = useState("KZ");  
  const[symbol, setSymbol] = useState("тг");
  const[user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

const [watchlist, setWatchList] = useState([])

useEffect(() => {
  if (user) {
    const coinRef = doc(db, "watchlist", user?.uid);
    var  unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        console.log(coin.data().coins)
        setWatchList(coin.data().coins);
      } else {
        console.log("No Items in Watchlist");
      }
    });

    return () => {
      unsubscribe();
    };
  }
}, [user]);









  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
console.log(user)

  const fetchCoins = async () => {
  
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    
    setCoins(data);
    setLoading(false);
    };
   

  useEffect(() => {
      if(currency === "KZ") setSymbol("₸");
      else if(currency === "USD") setSymbol("$");
  }, [currency]);

    return (
        <Crypto.Provider value={{currency,symbol,setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crypto);
};