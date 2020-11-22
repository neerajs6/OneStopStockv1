import React  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

import DrawerNav from '../DrawerNav';
import OSS from '../static/img/1SSLogo.png';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      zIndex: 5,
      [theme.breakpoints.down('md')]: {
        marginBottom: '55px'
      },
      marginBottom: '65px'
      
    },
    solidBorder: {
        borderTop: "1px solid #000",
        width: "100%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'block',
      textDecoration: 'none', 
      color: 'black',
      fontFamily: 'Airbnb Cereal App Light',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    search: {
      position: 'absolute',
      right: '30px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: theme.spacing(1),
      width: 'auto',
    },

    aTag: {
      color: 'black',
      '&:hover': {
        color: 'grey',
      },
    },
    
  }));

  const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#ffffff"
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {

        main: "#0044ff",
        // dark: will be calculated from palette.secondary.main,

      },
      alternative: {
        main: "#ffffff",
      },
      text: {
          primary: "#000000",
      }, 
      hover: {
        primary: "#A0BDD7"
      }
      // error: will use the default color
    },
    typography: {
      fontFamily: 'Airbnb Cereal App Light',
    }
  });
  
  export default function NavBar(props) {
    const classes = useStyles();

  
    return (

      <MuiThemeProvider theme={theme}>
        <div className={classes.root} >
        <AppBar position="fixed" elevation={0}  >
          <Toolbar>
            <DrawerNav />
            <img src={OSS} width="20px" height="20px"/>
            <Typography className={classes.title} component={Link} to="/" variant="h6" noWrap>
              One Stop Stock
            </Typography>
            <div className={classes.search}>
              <a href="/search" className={classes.aTag}>
                <SearchIcon className={classes.querySearch}/>
              </a>
            </div>
          </Toolbar>
        </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }