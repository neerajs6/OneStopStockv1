import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import APIClient from '../apiClient';
import {Redirect} from 'react-router-dom';

//https://stackoverflow.com/questions/31084779/how-to-restrict-access-to-routes-in-react-router



const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  formBody: {
    textAlign: 'center'
  },
  header: {
    fontFamily: 'Airbnb Cereal App Bold',
    fontSize: '44px',
    paddingBottom: '20px'
  },
  inputField: {
    width: '80%',
    margin: '20px'
  },
  wrapInput: {
    padding: '40px'
  },
  errorMessage: {
    fontFamily: 'Airbnb Cereal App Light'
  },
  register: {
    fontFamily: 'Airbnb Cereal App Light',
    color: '#B7B7B7'
  }
});

const api = new APIClient();

export default function Login({ login })  {
  const classes = useStyles();
  const [state, setState] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("username")) {
      setRedirect(true)
    }
  }, []);

  function handleChange(e) {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }




  
  async function handleSubmitClick(e) {
    e.preventDefault();

    if (state.username && state.password) {
        let response = await api.login(state.username, state.password);
        //console.log(response)
        if (response.status === 403) {
          setError(true)
          setErrorMsg("Incorrect username and password")
        }
        if (response.status === 200) {
          setError(false)
          setErrorMsg("")
          
          localStorage.setItem("id", response.id)
          localStorage.setItem("username", response.username)
          console.log(response.username)
          setRedirect(true)
          
        }


    } else {
        setError(true)
        if (!state.username) {
          setErrorMsg("Please enter a username");
        }
        else {
          setErrorMsg("Please enter a password")
        }
    }
}

  function renderRedirect() {
    if (redirect) {
      return  <Redirect  to={`/account/${localStorage.getItem("username")}`} />
    }

  }


  return (
    <Container>
      {renderRedirect()}
      <Grid container spacing={12}>
          <Grid item xs={0} sm={4}></Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.formBody}>
              <h3 className={ classes.header }>Log In</h3>
              <div className={ classes.errorMessage }>
                <p>{errorMsg}</p>
              </div>
              <form>
                <TextField 
                  className={classes.inputField} 
                  id="username"
                  required
                  onChange={handleChange} 
                  value={state.username} 
                  label="Username"
                  variant="outlined"
                  error={error}/>
                  
                <TextField 
                  className={classes.inputField} 
                  required
                  id="password"
                  type="password"
                  onChange={handleChange} 
                  value={state.password} 
                  label="Password"
                  variant="outlined"
                  error={error}/>
                <Button type="submit" onClick={handleSubmitClick} variant="outlined">Submit</Button>
              </form>
              <p className={classes.register}>Don't have an account? Register <a href="/register">here</a></p>
            </div>

          </Grid>
          <Grid item xs={0} sm={4}></Grid>

      </Grid>

    </Container>
  );
};
  
  