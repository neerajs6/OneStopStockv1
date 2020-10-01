import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import React from 'react';
import Article from '../Article';
import f1 from "../static/img/finance1.jpg";
//import Footer from '../Footer';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: 'Airbnb Cereal App Light',
      height: '100%',
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
    first: {
      textAlign: 'left',
      //textIndent: '1em'
    },
    articlesHeader: {
      textAlign: 'left',
      fontSize: '30px'
      
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
        <Container maxWidth="md" className={classes.root}> 
          <Grid container spacing={12}>
            <Grid item xs={12} sm={4}>
                <h1>We Are Here to Make the Stock Market Understandable</h1>
                <div className={ classes.first }>
                  <p >This website is meant to have words and tell you things to do. It was founded by two dudes at Northeastern that were in a Frat (kinda crazy?). Anyways, hope you get a lot out of what this site has to offer because it doesn't have a whole lot to offer tbh. 
                  </p>
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
            <img src={f1} alt="finance" className={classes.image}/>
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