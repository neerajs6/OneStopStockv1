import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';


import hero from '../static/img/about-us-hero.jpg';
import sam from '../static/img/about-us-cardholder.jpeg';



const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Airbnb Cereal App Light'
    },
    card: {
      maxWidth: 345,
    },
    cards: {
        paddingTop: '200px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    hero: {
      [theme.breakpoints.down('sm')]: {
          display: 'none'
      },
      width: '100%',
      height: 'auto'
    },
    aboutH1: {
        fontSize: '44px'
    },
    aboutp: {
        fontSize: '36px'
    }
  }));

export default function About() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Container >
            <img src={hero} className={ classes.hero } alt="hero"/>
            <Grid container spacing={12}>
                <Grid item xs={0} sm={1} />
                <Grid item xs={12} sm={4}>
                    <h1 className={ classes.aboutH1}>About Us</h1>
                    <p className={ classes.aboutp}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...
                    </p>
                </Grid>
                <Grid item xs={0} sm={2} />
                <Grid item xs={12} sm={4}>
                    <h1 className={ classes.aboutH1}> The Mission</h1>
                    <p className={ classes.aboutp}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...
                    </p>
                </Grid>
                <Grid item xs={0} sm={1} />
            </Grid>
            <Grid container spacing={8} className={classes.cards}>
                <Grid item xs={0} sm={1} />
                <Grid item xs={12} sm={4}>
                    <Card className={ classes.card }>
                        <CardMedia        
                        className={classes.media}
                        image={sam}
                        title="Sam" />
                        <CardContent>
                            <h3>
                                 Neeraj Sudhakar
                            </h3>
                            <p>
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </p>
                         </CardContent>
                            <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                             </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={0} sm={2} />
                <Grid item xs={12} sm={4}>
                    <Card className={ classes.card }>
                        <CardMedia        
                        className={classes.media}
                        image={sam}
                        title="Sam" />

                        <CardContent>
                            <h3>
                                 Sam Merkovitz
                            </h3>
                            <p>
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </p>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                             </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>

                </Grid>
                <Grid item xs={0} sm={1} />
                
            </Grid>

        </Container>
        </div>
    )
}