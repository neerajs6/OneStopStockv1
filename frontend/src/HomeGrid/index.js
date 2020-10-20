import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import React from 'react';
import Article from '../Article';
import f1 from "../static/img/finance1.jpg";
import leftToRight from '../static/img/left-to-right-arrow.png'
import rightToLeft from '../static/img/right-to-left-arrow.png'
import searchGif from '../static/img/search_gif.gif'
import favoriteGif from '../static/img/favorite_gif.gif'
//import Footer from '../Footer';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: 'Airbnb Cereal App Light',
      height: '100%',
      width: '80%'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',

    },
    solidBorder: {
        [theme.breakpoints.down('sm')]: {
            borderTop: "1px solid #000",
            width: "100%",
          },
        border: "0px"

    },
    hero: {
      [theme.breakpoints.up('sm')]: {
        minHeight: '800px',
        minWidth: '1140px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        height: '80%'
      },
      fontFamily: 'Dosis',
    },
    image: {
      width: 'auto',
      height: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '300px'
      }
    },

    articlesHeader: {
      textAlign: 'left',
      fontSize: '30px'
      
    },
    arrow: {
      paddingTop: '30px'
    },
    articleList: {
      textAlign: 'left'
    },
    searchGif: {
      width: '100%',
      height: 'auto',
      border: '1px solid black'
    },
    favoriteGif: {
      width: '40%'
    },
    howToSearch: {
      textAlign: 'justify',
      paddingRight: '30px'
    },
    introPs: {
      textAlign: 'justify'
    }
  }));

  const articles = [
      'What is a Stock?',
      'Teach Me Finance!',
      'The Secrets of Trading',
];

  export default function HomeGrid(){
    const classes = useStyles();
  
    return (
      <>
        <Container className={classes.root}> 
          <Grid container spacing={12}>
            <Grid item xs={12} sm={4}>
                <h1>We Are Here to Make the Stock Market Understandable</h1>
                <div className={ classes.introPs }>
                  <p >This website is meant to have words and tell you things to do. It was founded by two dudes at Northeastern that were in a Frat (kinda crazy?). Anyways, hope you get a lot out of what this site has to offer because it doesn't have a whole lot to offer tbh. 
                  </p>
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
            <img src={f1} alt="finance" className={classes.image}/>
            </Grid>
            <Grid item md={6} xs={0}>
              <img src={leftToRight} alt="arrow" className={classes.arrow} />
            </Grid>
            <Grid item md={6} xs={12}>
              <h2 className={classes.introPs}>And how are we going to make it understandable?</h2>
              <p className={classes.introPs}>
                What we've put together is a One Stop Shop (get it?) for investors with little to no experience to learn about the basics of investing with a platform to find digestible information about any stocks they may want to search up. 
              </p>
            </Grid>
            <Grid item md={6} xs={12}>
              <h2 className={classes.introPs}>Where should I start?</h2>
              <p className={classes.introPs}>
                We've done all the hard work for you and written some easy to digest articles that take you through the fundamentals of investing such as: 
                
                <ul className={classes.articleList}>
                  <li>What is a Stock?</li>
                  <li>Long Term Investing vs. Short Term Investing</li>
                  <li>Where to Invest</li>
                </ul> 
              </p>
            </Grid>
            <Grid item md={6} xs={0}>
              <img src={rightToLeft} alt="arrow" className={classes.arrow} />
            </Grid>
            <Grid item md={4} xs={12} style={{marginTop: '30px'}}>
              <h2 className={classes.introPs}>So how do you use the site</h2>
              <p className={classes.howToSearch}>You can search for information on almost any stock. We pull information from a multitude of services and APIs to give you the most up-to-date information on stocks and companies. To search for a stock, click on the search icon in the top right corner. You can start typing the name of a company or the stock symbol as seen in the accompanying GIF. </p>
              <p className={classes.howToSearch}>
                It is important to note that official company names as listed on the stock exchange to differ from common knowledge so it may take some digging to find the right one. For example, the stock GOOGL is listed for Alphabet INC-CL A instead of just Alphabet. 
              </p>
            </Grid>
            <Grid item md={8} xs={12} style={{marginTop: '30px'}}>
              <img src={searchGif} alt="search gif" className={classes.searchGif}/>
            </Grid>
            <Grid item md={4} xs={12} style={{marginTop: '30px'}}>
              <img src={favoriteGif} alt="search gif" className={classes.favoriteGif}/>
            </Grid>
            <Grid item  md={8} xs={12}>
              <h3 className={classes.introPs}>Create a Virtual Portfolio!</h3>
              <p className={classes.introPs}>
                What stocks you want to look up should be specific to you! We created the functionality for you to favorite your favorite stocks. When you search for a stock, you can click the heart icon to save that stock to your profile. This way, you can view all your favorite stocks from your account page for a One Stop Shop of your stocks. 
              </p>
            </Grid>
          

          
            <Grid item xs={12}>
              <div className={ classes.articlesHeader }>
                <h1>Articles</h1>
              </div>
            </Grid>
                
            <Grid item xs={12} container spacing={12}>
            {articles.map((article, key) => {
                return (
                  
                  // <Grid item xs={12}>
                  //     <Paper elevation={0} className={classes.paper}>{article}</Paper>
                  //     <hr className={classes.solidBorder}/>
                  // </Grid>
                <Grid item xs={12} sm={6} container>
                  
                  <Article title={article}></Article>
                  <hr className={classes.solidBorder}/>
                </Grid>
                
                  
                );
                })}
              
              </Grid>
            </Grid>


        
        </Container>
        {/* <Footer /> */}
        </>

    );
  }