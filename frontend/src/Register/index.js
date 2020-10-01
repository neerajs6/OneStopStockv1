import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import APIClient from '../apiClient';
import {Redirect} from 'react-router-dom';



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
  login: {
    fontFamily: 'Airbnb Cereal App Light',
    color: '#B7B7B7'
  }
});

const api = new APIClient();

export default function Register({ register })  {
  const classes = useStyles();
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  });
  const initialErrorState = {
    first_name: false,
    last_name: false,
    email: false,
    username: false,
    password: false
  }

  const initialErrorMsgState = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: ""
  }
  const [errorState, setErrorState] = useState(initialErrorState);


  const [errorMsg, setErrorMsg] = useState(initialErrorMsgState)
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

  function validatePassword(password) {

        // Validate lowercase letters

    var lowerCaseLetters = /[a-z]/g;
    if(!password.match(lowerCaseLetters)) {
      return true
    } 

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(!password.match(upperCaseLetters)) {
      return true
    } 
    // Validate numbers
    var numbers = /[0-9]/g;
    if(!password.match(numbers)) {
      return true
    } 

    // Validate length
    if(password.length < 8) {
      return true
    } 
    return false;
  }

  function validateEmail(email) {
    const emR = /\S+@\S+\.\S+/g;

    if (email.match(emR)) {
      console.log(true)
      return false
    }
    console.log(false)
    return true;
  }



  
  async function handleSubmitClick(e) {
    e.preventDefault();

    if (state.email && state.username && state.password && state.first_name && state.last_name) {
      setErrorMsg(initialErrorMsgState)
      setErrorState(initialErrorState)
      var msg = validatePassword(state.password)
      var email = validateEmail(state.email);

      //depends on error, will have to add
      if ((!msg && !email)) {
        console.log(msg);
        removeErrorMessage("password", "Password must have at least 8 letters and use at least one lowercase letter, uppercase letter and number");
      
        let response = await api.register(state.first_name, state.last_name,
                                        state.email, state.username, state.password);
        console.log(response)
        if (response.status === 500) {
          if (response.comment === "name_taken") {
            addErrorMessage("username", "Username taken")
          }
          if (response.comment === "email_has_account") {
            addErrorMessage("email", "Email has an account already")
          }

        }
        if (response.status === 200) {

          setErrorMsg([])
          
          localStorage.setItem("id", response.id)
          localStorage.setItem("username", response.username)
          console.log(response.username)
          setRedirect(true)
          
        }
      }
      else {
        if (msg) {
          addErrorMessage("password", "Password must have at least 8 letters and use at least one lowercase letter, uppercase letter and number");
        }
        if (email) {
        addErrorMessage('email', ["Please enter a valid email"]); 
        }

      }


    } else {
      setErrorMsg(initialErrorMsgState)
      setErrorState(initialErrorState)

        if (!state.email) {
          addErrorMessage('email', ["Please enter an email"]); 
        } else {
          if (validateEmail(state.email)) {
            removeErrorMessage('email', ["Please enter an email"]);
          }
          else {
            addErrorMessage('email', ["Please enter a valid email"]); 
            
          }

          

        }

        if (!state.username) {
          addErrorMessage('username', ["Please enter a username"]); 
        } else {
          removeErrorMessage('username', ["Please enter a username"]);
        }

        if (!state.first_name) {
          addErrorMessage('first_name', ["Please enter your first name"]);
        } else {
          removeErrorMessage('first_name', ["Please enter your first name"]);
        }

        if (!state.last_name) {
          addErrorMessage('last_name', ["Please enter your last name"]);
        } else {
          removeErrorMessage('last_name', ["Please enter your last name"]);
        }

        if (!state.password) {
          addErrorMessage("password", ["Please enter a password"]);
        } else {
          removeErrorMessage("password", ["Please enter a password"]);


        }


      }
      
        
    }
  

  function addErrorMessage(key, msg) {
    setErrorState(prevState => ({
      ...prevState,
      [key] : true
    }));
    setErrorMsg(prevState => ({
      ...prevState,
      [key] : msg
    }));
  }

  function removeErrorMessage(key, msg) {
    setErrorState(prevState => ({
      ...prevState,
      [key] : false
    }));
    setErrorMsg(prevState => ({
      ...prevState,
      [key] : ""
    }));
  }

  function renderRedirect() {
    if (redirect) {
      return  <Redirect  to="/" />
    }

  }


  return (
    
    <Container>
      {renderRedirect()}
      <Grid container spacing={12}>
          <Grid item xs={0} sm={4}></Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.formBody}>
              <h3 className={ classes.header }>Register</h3>

              <form>
                <TextField 
                  className={classes.inputField} 
                  id="first_name"
                  required
                  onChange={handleChange} 
                  value={state.first_name} 
                  label="First Name"
                  variant="outlined"
                  error={errorState.first_name}
                  helperText={errorMsg.first_name}/>
                <TextField 
                  className={classes.inputField} 
                  id="last_name"
                  required
                  onChange={handleChange} 
                  value={state.last_name} 
                  label="Last Name"
                  variant="outlined"
                  error={errorState.last_name}
                  helperText={errorMsg.last_name}/>
                <TextField 
                  className={classes.inputField} 
                  id="email"
                  required
                  onChange={handleChange} 
                  value={state.email} 
                  label="Email"
                  variant="outlined"
                  error={errorState.email}
                  helperText={errorMsg.email}/>

                <TextField 
                  className={classes.inputField} 
                  id="username"
                  required
                  onChange={handleChange} 
                  value={state.username} 
                  label="Username"
                  variant="outlined"
                  error={errorState.username}
                  helperText={errorMsg.username}/>
                  
                <TextField 
                  className={classes.inputField} 
                  required
                  id="password"
                  type="password"
                  onChange={handleChange} 
                  value={state.password} 
                  label="Password"
                  variant="outlined"
                  error={errorState.password}
                  helperText={errorMsg.password}/>
                <Button type="submit" onClick={handleSubmitClick} variant="outlined">Submit</Button>
              </form>
              <p className={classes.login}>Have an account? Log in <a href="/login">here</a></p>
            </div>

          </Grid>
          <Grid item xs={0} sm={4}></Grid>

      </Grid>

    </Container>
  );
};
  
  