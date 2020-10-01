import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: 'Dosis',
    },
    header: {
        textAlign: 'left',
        marginTop: '-25px',
        marginBottom: '-25px'
    },
    headerText: {
        [theme.breakpoints.down('sm')]: {

        },
        fontSize: '28px',
    },
    body: {
        fontSize: '18px',
        textAlign: 'left'
    },
    image: {
        width: '300px',
        height: 'auto'
    },
    date: {
        color: 'grey'
    }
  }));
export default function Article({title}) {
    const classes = useStyles();
    

    return (


        <Grid item xs>
            <div className={ classes.header }>
                <h2 className={ classes.headerText }>{title}</h2>
            </div>
            <div className={ classes.body }>
                <p><span className = {classes.date }>Sep. 17, 2020 • </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
            </div>
        </Grid>

    )
}