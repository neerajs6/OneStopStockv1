import React from 'react';
import {  Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Typist from 'react-typist';


const FadeIn = styled.div`animation: 5s ${keyframes`${fadeIn}`} `;



const useStyles = makeStyles((theme) => ({

    root: {

        maxHeight: '700px',
        maxWidth: '1140px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: '100%',
        paddingBottom: '200px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '5%',
            paddingRight: '5%',
            maxHeight: 'auto',
            maxWidth: '90%',
        },
        fontFamily: 'Airbnb Cereal App Light',
        
      
    },
    header: {
        textAlign: 'center',
        fontSize: '44px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '34px',
            textAlign: 'left',
        }
    },
    mainSection: {
        backgroundColor: 'grey',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    container: {
        paddingTop:'150px',
        [theme.breakpoints.down('sm')]: {
            paddingTop:'100px',
        }
    }

  }));

export default function HomeMainSection(){
    const classes = useStyles();


    
    return (
        <div className={classes.root}> 
            {/* <Grid container spacing={10}>
                <Grid item sm={12} md={4}>
                    <div className={ classes.header }>
                        <Bounce><h1>Welcome to One Stop Stock</h1></Bounce>
                    </div>
                </Grid>
                <Grid item sm={0} md={1}></Grid>
                <Grid item sm={0} md={7}>
                    <div className={classes.mainSection}>
                        hello
                    </div>
                </Grid>
            </Grid> */}
            <Container className={classes.container}>
                <div className={ classes.header }>
                    <Typist
                    cursor={{ hideWhenDone: true }}>
                        <h1>Welcome to One Stop Stock</h1></Typist>
                </div>
            </Container>
            
        </div>
            

    );
    

}

