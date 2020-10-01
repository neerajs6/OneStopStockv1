import React from 'react';
import HomeGrid from '../HomeGrid';
//import { Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import HomeMainSection from '../HomeMainSection'




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: 'Dosis',
      textAlign: 'center',
      height: '100%',
      margin: 0,

    },
    solidBorder: {
        [theme.breakpoints.down('sm')]: {
            borderTop: "1px solid #000",
            width: "100%",
          },
        border: "0px"

    },
    hero: {

        maxHeight: '800px',
        maxWidth: '1140px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: '100%'
      
    }
  }));

export default function Home(){
    const classes = useStyles();


    
    return (
        <div className={classes.root}> 
            <HomeMainSection />
            <HomeGrid />
            
        </div>
            

    );
    

}

