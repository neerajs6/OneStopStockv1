import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';


import hero from '../static/img/about-us-hero.jpg';
import sam from '../static/img/about-us-cardholder.jpeg';
import avatar from '../static/img/img_avatar.png'



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
        fontSize: '24px'
    },
    linkedin: {
        textDecoration: 'underline',
        color: 'black'
    },
    avatarPhoto: {
        borderRadius: '50%',
        width: '80%'
    }
  }));

export default function About() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Container >

            <Grid container spacing={12}>
                <Grid item xs={0} sm={1} />
                <Grid item xs={12} sm={4}>
                    <img src={avatar} className={classes.avatarPhoto} alt="avatar" />
                    <h1 className={ classes.aboutH1}>Neeraj Sudhakar</h1>
                    <p className={ classes.aboutp}>
                        Neeraj is a current senior at Northeastern University pursuing a BS in Chemical Engineering and a MS in Engineering/Industrial Management. He is passionate about all things investment with experience working at companies like Wealth Planning Advisory Group, Vertex Pharmaceuticals, and Mersana Therapeutics. His motivation for founding One Stop Stock was due to a lack of digestible information across the internet when it comes to investing. 
                    </p>
                    <p>Feel free to connect with Neeraj on <a className={classes.linkedin} target="_blank" href="https://www.linkedin.com/in/neerajsudhakar/">LinkedIn</a></p>
                </Grid>
                <Grid item xs={0} sm={2} />
                <Grid item xs={12} sm={4}>
                    <img src={avatar} className={classes.avatarPhoto} alt="avatar" />
                    <h1 className={ classes.aboutH1}>Sam Merkovitz</h1>
                    <p className={ classes.aboutp}> 
                        Sam Merkovitz is a current senior at Northeastern University pursuing a BS in Computer Science and Philosophy. He loves finding ways to tackle new problems by finding solutions that help the everyday person. He has experience as a full stack web developer and a backend engineer. As the lead Web Developer on this site, he hopes that it serves as an easy-to-use, intuitive resource for those looking to get into investing. 
                    </p>
                    <p>Feel free to connect with Sam on <a className={classes.linkedin} target="_blank" href="https://www.linkedin.com/in/sam-merkovitz">LinkedIn</a></p>
                </Grid>
                <Grid item xs={0} sm={1} />
            </Grid>

        </Container>
        </div>
    )
}