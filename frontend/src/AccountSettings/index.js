import React,  { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import ChangeAccountField from '../ChangeAccountField';
import APIClient from '../apiClient';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        fontFamily: 'Airbnb Cereal App Light',
        padding: '30px'
        
    },
    userField: {
        textAlign: 'left'
    },
    change: {
        textAlign: 'right'
    }


}));


const api = new APIClient();

export default function AccountSettings(userInfo) {
    const classes = useStyles();
    const [change, setChange] = useState({
        first_name: false, 
        last_name: false,
        username: false,
        email: false,
        password: false
    })

    const [user, setUser] = useState({
        first_name: '', 
        last_name: '',
        username: '',
        email: ''
    })

    const [redirect, setRedirect] = useState(false);

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    useEffect(() => {
        api.getUserInfo(localStorage.getItem("id")).then((response) => {
            setUser({
                first_name:response.first_name,
                last_name: response.last_name,
                email: response.email,
                username: response.username
            })
            localStorage.setItem("username", response.username)
        })

    }, [])


    function openEditor(e) {
        const { id } = e.currentTarget
        console.log(id)

        setChange(prevState => ({
            ...prevState,
            [id] : true
        }))
      }


    function closeEditor(e) {
        const { id } = e.currentTarget
        console.log(id)

        setChange(prevState => ({
            ...prevState,
            [id] : false
        }))
      }

    function deleteAccount() {
        api.deleteAccount(localStorage.getItem("id")).then((res) => {
            if (res.status === 200) {
                localStorage.clear();
                setSuccess(true);
                setTimeout(5000)
                setRedirect(true)
                
            } else {
                setFail(true);
            }

        });
    }

    function renderRedirect() {
        if (redirect) {
            return <Redirect to="/" />
        }
    }

    return (
        <Container maxWidth="sm" className={ classes.container }>
            {renderRedirect()}
            <Grid container spacing={12} className={ classes.container }>
                <Grid item container className={ classes.row } xs={12}>
                    <Grid item className={ classes.userField } xs={6}>
                        {user.first_name}
                    </Grid>
                    {!change.first_name ? 
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="first_name" onClick={openEditor}>
                            Change
                        </Button>
                    </Grid>
                    :
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="first_name" onClick={closeEditor}>
                        Close
                        </Button>
                    </Grid>

                    }
                </Grid>
                
                {change.first_name ? <ChangeAccountField field={"first_name"} oldVal={user.first_name} /> : null}
                <Grid item container className={ classes.row } xs={12}>
                    <Grid item className={ classes.userField } xs={6}>
                        {user.last_name}
                    </Grid>
                    {!change.last_name ? 
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="last_name" onClick={openEditor}>
                        Change
                        </Button>
                    </Grid>
                    :
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="last_name" onClick={closeEditor}>
                        Close
                        </Button>
                    </Grid>

                    }

                </Grid>
                {change.last_name ? <ChangeAccountField field={"last_name"} oldVal={user.last_name}/> : null}
                <Grid item container className={ classes.row } xs={12}>
                    <Grid item className={ classes.userField } xs={6}>
                        {user.username}
                    </Grid>
                    {!change.username ? 
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="username" onClick={openEditor}>
                        Change
                        </Button>
                    </Grid>
                    :
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="username" onClick={closeEditor}>
                        Close
                        </Button>
                    </Grid>

                    }
                </Grid>
                {change.username ? <ChangeAccountField field={"username"} oldVal={user.username}/> : null}
                <Grid item container className={ classes.row } xs={12}>
                    <Grid item className={ classes.userField } xs={6}>
                        {user.email}
                    </Grid>
                    {!change.email ? 
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="email" onClick={openEditor}>
                        Change
                        </Button>
                    </Grid>
                    :
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="email" onClick={closeEditor}>
                        Close
                        </Button>
                    </Grid>

                    }
                </Grid>
                {change.email ? <ChangeAccountField field={"email"} oldVal={user.email}/> : null}
                <Grid item container className={ classes.row } xs={12}>
                    <Grid item className={ classes.userField } xs={6}>
                        Password
                    </Grid>
                    {!change.password ? 
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="password" onClick={openEditor}>
                        Change
                        </Button>
                    </Grid>
                    :
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="password" onClick={closeEditor}>
                            Close
                        </Button>
                    </Grid>

                    }
                </Grid>
                {change.password ? <ChangeAccountField field={"password"} /> : null}
                <Grid item container className={ classes.row } xs={12}>
                {success ? 
                    <Alert severity="success">Account deleted successfully. Page will redirect in 5 seconds...</Alert>
                :
                    null
                }
                {fail ? 
                    <Alert severity="error">Account could not be deleted. Please contact support</Alert>
                :
                    null
                }
                    <Grid item className={ classes.userField } xs={6}>
                        Delete Account?
                    </Grid>
                    <Grid item className={ classes.change } xs={6}>
                        <Button id="password" onClick={deleteAccount}>
                            Delete
                        </Button>
                    </Grid>
                
                </Grid>
            </Grid>
        </Container>
    )
}