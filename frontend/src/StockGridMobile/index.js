import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Container, List, ListItem, ListItemText, Switch, Dialog, 
  DialogActions, DialogContent, Button, DialogContentText, DialogTitle } from '@material-ui/core'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import React, { useState, useEffect } from 'react';
import StockTable from '../StockTable';
import { useParams, Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import APIClient from '../apiClient'

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
    }
  }));
 


const articles = [
    'What is a Stock?',
    'Teach Me Finance!',
    'Teach Yourself Finance',
];

const apiClient = new APIClient();

export default function StockGridMobile(){
  const classes = useStyles();
  const [graph, setGraph] = useState(true);
  const [favorite, setFavorite] = useState(false)
  const Icon = favorite ? FavoriteIcon : FavoriteBorderIcon

  const { symbol } = useParams();
  const [symbolName, setSymbol] = useState(splitParams(0));
  const [companyName, setCompanyName] = useState(splitParams(1));

  const [stockData, setStockData] = useState([]);

  const [dialog, setDialogOpen] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [loadedTweets, setLoadedTweets] = useState(false);

  const Graph = graph ? "strongBuy" : "strongSell";

  function splitParams(idx) {
    console.log("hello " + symbol)
    return String(symbol).split("&")[idx];
  }
  
  useEffect(() => {
    const apiClient = new APIClient();
    apiClient.getStockData(symbolName).then((data) =>{
      data = data.map((entry) => createDate(entry));

      setStockData(data.reverse());

      apiClient.isFavorite(symbolName, localStorage.getItem("id")).then((fav) => {
        console.log(fav)
        if (fav.comment === "is_favorite") {
          setFavorite(true)
        }
        else {
          setFavorite(false);
        }
        apiClient.getTweetsFromSymbol(symbolName, companyName).then((res) => {
          setTweets(Object.values(res[2]));
          setLoadedTweets(true);
        })

      })

    });}, [])

    function createDate(data) {
      return {"buy": data['buy'], "hold": data['hold'], "period": new Date(data['period']), "sell": data['sell'], "strongBuy": data['strongBuy'], "strongSell": data['strongSell'], "symbol": data['symbol']}
  
    }

  function getFilteredData(data, x, y) {
    return {"x": new Date(data[x]), "y": data[y]}
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



  return (
      <Container maxWidth="md" className={classes.root}> 
      <Grid container spacing={3} alignItems={'center'} justify={'center'}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
              <h1>{symbolName}</h1>
              <Icon onClick={clickFavorite} className={classes.icon}/>
              {/* Add favorite count to this, will need to query how many unique users have favorite this stock, then 
              can display the number next to the heart (will need to do a plus one if the user favorites it and 
              a minus one if they defavorite it) 
              ACTUALLY PROBABLY A LAME FEATURE SINCE MOST WILL HAVE 0 LIKES*/}
              <StockTable />
          </Paper>
          <hr className={classes.solidBorder}/>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <LineChart
                width={300}
                height={300}
                data={stockData}
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
                data={stockData}
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

          {!loadedTweets ? (

          <h3>Loading tweets..</h3>

          ) : (
            <Grid item xs={12}>
            <Paper className={classes.paper} elevation={0}>
                <h3>What Twitter is saying...</h3>
                <List>
                {tweets.map((tweet, key) => {
                return (
                        <ListItem key={key}>
                            <ListItemText >

                                <span className={classes.tweet}>{tweet}</span>
                                  
                                
                              </ListItemText>
                        </ListItem>
                    );
                })}
                </List>
            </Paper>
          </Grid>

          )}

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
        
{/*           
        {articles.map((article, key) => {
            return (
              
              <Grid item xs={12}>
                  <Paper elevation={0} className={classes.paper}>{article}</Paper>
                  <hr className={classes.solidBorder}/>
              </Grid>
              
            );
            })} */}


      </Grid>
      </Container>

  );
}