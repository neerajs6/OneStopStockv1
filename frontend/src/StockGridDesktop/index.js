import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Container, List, ListItem, ListItemText, Switch, Dialog, 
  DialogActions, DialogContent, Button, DialogContentText, DialogTitle,
  FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import React, { useState, useEffect } from 'react';
import StockTable from '../StockTable';
import { useParams, Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import APIClient from '../apiClient'

const mainContentWidth = window.screen.availWidth - 400;

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: 'Airbnb Cereal App Light',
      
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      alignItems: 'center',
      color: theme.palette.text.secondary,
    },
    solidBorder: {
        [theme.breakpoints.down('xs')]: {
            borderTop: "1px solid #000",
            width: "100%",
          },
        border: "0px"

    },
    articles: {
      fontFamily: 'Airbnb Cereal App Light'
    },
    articleHeader: {
      fontFamily: 'Airbnb Cereal App Bold'
    },
    icon: {
      color: 'pink',
      paddingBottom: '20px'
    },
    sidebar: {
      backgroundColor: 'grey',
      height: '70%', /* Full-height: remove this if you want "auto" height */
      width: '160px', /* Set the width of the sidebar */
      position: 'fixed', /* Fixed Sidebar (stay in place on scroll) */
      zIndex: 1, /* Stay on top */
      top: 130, /* Stay at the top */
      left: 30,
      textAlign: 'center',
      alignItems: 'center'
    },
    mainContents: {
        marginLeft: '160px', /* Same as the width of the sidebar */
        marginRight: '60px',
        padding: '0px 10px',
        width: mainContentWidth
    }
  }));
 


const articles = [
    'What is a Stock?',
    'Teach Me Finance!',
    'Teach Yourself Finance',
];

const today = new Date();


const timeframe_filter = {
  "1day": ["day", 1],
  "1week": ["day", 7],
  "1month": ["month", 1], 
  "6month": ["month", 6],
  "1year": ["month", 12],
}

const apiClient = new APIClient();

export default function StockGridDesktop(){
  const classes = useStyles();
  const [graph, setGraph] = useState(true);
  const [favorite, setFavorite] = useState(false)
  const Icon = favorite ? FavoriteIcon : FavoriteBorderIcon

  const { symbol } = useParams(); 
  const [stockData, setStockData] = useState([]);
  const [filteredStockData, setFilteredStockData] = useState([]);

  const [dialog, setDialogOpen] = useState(false);

  const Graph = graph ? "strongBuy" : "strongSell";

  const [timeframe, setTimeframe] = useState('1year');
  
  useEffect(() => {
    const apiClient = new APIClient();
    apiClient.getStockData(symbol).then((data) =>{
      data = data.map((entry) => createDate(entry));

      setStockData(data.reverse());
      setFilteredStockData(data.reverse());
      apiClient.isFavorite(symbol, localStorage.getItem("id")).then((fav) => {
        console.log(fav)
        if (fav.comment === "is_favorite") {
          setFavorite(true)
        }
        else {
          setFavorite(false);
        }

      })

    });}, [])

  function createDate(data) {
    return {"buy": data['buy'], "hold": data['hold'], "period": new Date(data['period']), "sell": data['sell'], "strongBuy": data['strongBuy'], "strongSell": data['strongSell'], "symbol": data['symbol']}

  }

  function clickFavorite() {
    if (localStorage.getItem("id")) {
      setFavorite(!favorite)
      if (favorite) {
        apiClient.removeFromFavorites(symbol, localStorage.getItem("id"));
      }
      else {
  
        apiClient.addToFavorites(symbol, localStorage.getItem("id"));
      }
    }
    else {
      handleOpen();
    }
  }

    const handleOpen = () => {
      setDialogOpen(true)
    }

    const handleClose = () => {
      setDialogOpen(false);
    };

    const handleChange = (event) => {
      setTimeframe(event.target.value);
      const unit = timeframe_filter[event.target.value][0]
      const value = timeframe_filter[event.target.value][1]
      var start = null;
      if (unit === "day") {
        start = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDay() - value, 0, 0, 0, 0)
      }
      if (unit === "month") {
        start = new Date(today.getUTCFullYear(), today.getUTCMonth() - value, today.getUTCDay(), 0, 0, 0, 0)

      }
      var filterStock = stockData.filter((stock) => {
          return stock['period'] > start
      })

      setFilteredStockData(filterStock);

    };



  return (
      <Container maxWidth="lg" className={classes.root}> 
        <Paper className={classes.sidebar} >
          <h1>{symbol}</h1>
          <Icon onClick={clickFavorite} className={classes.icon}/>
          <br></br>
          <FormControl component="fieldset">
            <FormLabel component="legend">Timeframe</FormLabel>
            <RadioGroup aria-label="timeframe" name="timeframe" value={timeframe} onChange={handleChange}>
              <FormControlLabel value="1day" control={<Radio />} label="1 Day" />
              <FormControlLabel value="1week" control={<Radio />} label="1 Week" />
              <FormControlLabel value="1month" control={<Radio />} label="1 Month" />
              <FormControlLabel value="6month" control={<Radio />} label="6 Months" />
              <FormControlLabel value="1year" control={<Radio />} label="1 Year" />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Must be logged in to use this feature"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You need to be logged in to favorite stocks. Having an account will allow you to track 
              your favorite stocks all on your account page. To register for a free account, click 
              Register. To learn more about what having an account allows you to do, <strong>click here</strong>. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button component={Link} to="/login" color="primary" autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      <Grid container spacing={3} alignItems={'center'} justify={'center'} className={classes.mainContents}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
              <StockTable />
          </Paper>
          <hr className={classes.solidBorder}/>

        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <LineChart
                width={300}
                height={300}
                data={filteredStockData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="buy" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="hold" stroke="#82ca9d" />
            </LineChart>
          </Paper>
          <hr className={classes.solidBorder}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0} >
              <LineChart
                width={300}
                height={300}
                data={filteredStockData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey={Graph} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
                  
                  <Switch
                    checked={graph}
                    onChange={() => setGraph(!graph)}
                    name="switch" />
    

          </Paper>
          <hr className={classes.solidBorder}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={0}>
              <h1>Sentiment Analysis</h1>
            </Paper>
            <hr className={classes.solidBorder}/>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
              <h3>Top Articles</h3>
              <List>
              {articles.map((article, key) => {
              return (
                      <ListItem key={key}>
                          <ListItemText >
                            <div className={classes.articles}>
                              <h4 className={classes.articleHeader}>{article}</h4>
                              <p>
                                Lorem ipsum dolor words that I'm making up as I type because all I really need is
                                filler text
                              </p>
                            </div></ListItemText>
                      </ListItem>
                  );
              })}
              </List>
          </Paper>
        </Grid>
        



      </Grid>
      </Container>

  );
}