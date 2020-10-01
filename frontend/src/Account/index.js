import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {  Grid, Card,  CardContent, CardActions, 
    Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
import APIClient from '../apiClient';


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Airbnb Cereal App Light'
    },
    fontChange: {
        fontFamily: 'Airbnb Cereal App Light'
    },
    content: {
        flex: '1 0 auto',
    },
    

}));

const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}

const api = new APIClient();

export default function Account() {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState({
        "first_name": '',
        "last_name": '',
        "registered_date": '',
        "email": ''
    })
    const [stockSymbols, setStockSymbols] = useState([]);

    function logout() {
        localStorage.clear()
        setRedirect(true)
    }
    

    useEffect(() => {
        if (!localStorage.getItem("id")) {
            setRedirect(true);
        }
        else {
            api.getUserInfo(localStorage.getItem("id")).then((response) => {
                setUser({
                    "first_name":response.first_name,
                    "last_name": response.last_name,
                    "registered_date": parseDate(response.registered_date),
                    "email": response.email
                })

                api.getFavorites(localStorage.getItem("id")).then((stocks) => {
                    for(var i = 0; i < stocks.length; i++) {
                        var stock = stocks[i];
                        console.log(stock['stock_symbol'])
                        setStockSymbols(stockSymbols => stockSymbols.concat(stock['stock_symbol']))
                        
                    }
                    console.log(stockSymbols)
                })
            })

            

        }
    }, [])



    function parseDate(dateString) {
        var year = dateString.substring(0,4)
        var month = dateString.substring(5, 7)
        var month_name = months[month]
        var d = month_name + ' ' + year
        console.log(d)
        return d
    }

    function renderRedirect() {
        if(redirect) {
            return  <Redirect  to="/" />
        }
    }



    return (
        <>
            {renderRedirect()}
            <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                <span className={classes.fontChange }>{user.first_name} {user.last_name}</span>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                <span className={classes.fontChange }>{user.email}</span>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            <span className={classes.fontChange }>Member since {user.registered_date}</span>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                <Link to={`/account/${localStorage.getItem("username")}/settings`}>
                                    Settings
                                </Link>
                            </Button>
                            <Button size="small" color="primary" onClick={logout}>
                                Log Out
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item container xs={12}>
                
                  
                <List>
                {stockSymbols.map((stock, key) => {

                return (
                      <ListItem key={key}>
                          <ListItemText >
                            <div className={classes.articles}>
                              <h4 className={classes.articleHeader}>{stock}</h4>
                            </div>
                        </ListItemText>
                      </ListItem>
                        
                 );})}
                </List>
                </Grid>
            </Grid>
        </>
    )
}