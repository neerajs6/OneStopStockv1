import React, { useState, useEffect } from 'react';
import { makeStyles, Container, TextField, Typography, Grid } from '@material-ui/core';
import StocksDictionary from '../StocksDictionary';
import { Link } from 'react-router-dom';
import ReactLoading from "react-loading";
//import Footer from '../Footer';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: 'Airbnb Cereal App Light',
    },
    searchField: {
        [theme.breakpoints.down('md')]: {
            width: '90%'
        },
        width: '80%',
        marginBottom: '20px',
        position: 'fixed',
        backgroundColor: 'white'
    },
    searchFieldProps: {
        fontSize:"34px",
        fontFamily: 'Airbnb Cereal App Light',
    },
    container: {
        height: '100vh',
    },
    loading: {
        fontFamily: 'Airbnb Cereal App Light',
        alignItems: 'center',
        justify: 'center'
    },
    stockSearch: {
        fontFamily: 'Airbnb Cereal App Light',
        color: '#B7B7B7',
        '&:hover': {
            color: 'black'
        },
        textDecoration: 'none'

    },
    results: {
        paddingTop: '75px'
    }
  }));


  const topCompanies = [
      {symbol:"AAPL", company:"APPLE INC"},
      {symbol:"GOOG", company:"ALPHABET INC-CL C"},
      {symbol:"NDAQ", company:"NASDAQ INC"},
      {symbol:"SBUX", company:"STARBUCKS CORP"},
      {symbol:"TSLA", company:"TESLA INC"},
      {symbol:"NKE", company:"NIKE INC -CL B"},
      {symbol:"FB", company:"FACEBOOK INC-CLASS A"},
      {symbol:"F", company:"FORD MOTOR CO"},
      {symbol:"GM", company:"GENERAL MOTORS CO"},
      {symbol:"AMZN", company:"AMAZON.COM INC"},
      {symbol:"NFLX", company:"NETFLIX INC"},
      {symbol:"W", company:"WAYFAIR INC-CLASS A"},
      {symbol:"VZ", company:"VERIZON COMMUNICATIONS INC"},
      {symbol:"T", company:"AT&T INC"},
      {symbol:"LULU", company:"LULULEMON ATHLETICA INC"}


  ]


export default function Search() {
    const [stocks, setStocks] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const classes = useStyles();

    const [filteredStocks, setFilteredStocks] = useState(topCompanies);

    useEffect(() => {
        var st =  StocksDictionary.getStockSymbols();
        setTimeout(function(){ 
            if (st) {
                setStocks(st);
                setLoaded(true);


            }
        }, 3000);
        //set resources here, can save searches and display them

    }, []);


    function onChange(e) {
        var val = e.target.value.toUpperCase();
        var filters = stocks.filter(stock => (stock.company.includes(val) || stock.symbol.includes(val)));

        console.log(filters)
        setFilteredStocks(filteredStocks => filters.slice(0, 15))

    }

    return !isLoaded ? (

        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
      
        <Grid item xs={3}>
        <ReactLoading type={"bars"} color={"black"} />
        </Grid>   
      
      </Grid> 

    ) : (
        <>
        <div className={ classes.container }>

        <Container >
            {/* <Typography variant="p">
                Search for a stock by the name of the organization or by the ticker symbol (e.g. "Apple Inc" or "AAPL"). 
                Click on the organization name to see their stock data
            </Typography> */}
            <TextField id="stock-search" label="Enter a Company Name or Stock Symbol" 
            className={classes.searchField}
            InputProps={{
                classes: {
                    input: classes.searchFieldProps
                }
            }}
            onChange={onChange} />

            <div className={classes.results}>
            {filteredStocks.map((stock, key) => {
                return (
                    <div key={key} >
                        <Typography component={Link} to={`/stocks/${stock.symbol}&${stock.company}`} className={classes.stockSearch} variant="h4">
                            {stock.company}
                        </Typography>

                    </div>
                );
                })}
            </div>

                    
        </Container>
        
        </div>
        {/* Probably don't even want this on the search page...
        <Footer className={ classes.footer } /> */}
        </>
        
    )
}