import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
const useStyles = makeStyles(() => {
  return ({
    title: {
      flex: 1,
      color: "#ea822b",
      fontFamily: "Montserrat",
      fontWeight: "700",
      cursor: "pointer",
      
    },
  });
});



const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const {currency, setCurrency, user} = CryptoState();
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ea822b",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
     <AppBar  color="transparent" position="static">
       <Container>
         <Toolbar>
           <Typography  onClick={() => history.push(`/`)} className={classes.title} variant="h6">  Alatau
           Invest</Typography>
<Select variant="outlined"  style={{width:100, height:40, marginRight: 15,}}
value={currency} 
onChange={(e) => setCurrency(e.target.value)}>
  <MenuItem value={"USD"}>USD</MenuItem>
  <MenuItem value={"KZ"}>KZ</MenuItem>
</Select>
{user ? <UserSidebar/>: <AuthModal/>}
         </Toolbar>
       </Container>
     </AppBar>
     </ThemeProvider>
  )
}

export default Header