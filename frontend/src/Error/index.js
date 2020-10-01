import React from 'react';
import { Container,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        fontFamily: 'Dosis'
    }
}));

export default function ErrorNotFound(){
    const classes = useStyles();

    return (
        <Container>
        <h1 className = {classes.text}>This doesn't seem right...</h1>
        <p className = {classes.text}>Hey there, looks like you navigated to the wrong page. Check the menu on the left for valid routes. </p>
        </Container>
    )
}