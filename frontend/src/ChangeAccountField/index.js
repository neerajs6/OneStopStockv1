import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import APIClient from '../apiClient'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    changeFields: {
        display: 'flex'
    },
    inputField: {
        paddingLeft: '30px'
    }

}));

const userFields = {
    "first_name": "First Name",
    "last_name": "Last Name",
    "username": "Username",
    "email": "Email",
    "password": "Password"
}

const api = new APIClient();




export default function ChangeAccountField({ field, oldVal }) {
    const classes = useStyles();

    const [value, setValue] = useState('');
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false)
    const [failMessage, setFailMessage] = useState('')

    function handleChange(e) {
        setValue(e.target.value)

    }


    async function updateField() {
        setSuccess(false)
        setFail(false)
        if (value === oldVal) {

            setFail(true)
            setFailMessage("Must be different than current value")
        }
        else {
            api.updateField(localStorage.getItem("id"), localStorage.getItem("username"), field, value).then((res) => {
                console.log(res)
                if (res.status === 200) {
    
                    setSuccess(true)
                    setTimeout(2500)
                    window.location.reload()
                }
                else {
                    setFail(true)
                    setFailMessage(res.comment)
                }
            })

        }


    }

    return (
        <Grid item  
            xs={12} 
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className={ classes.changeFields }>
            {success ? 
            <Alert severity="success">{userFields[field]} updated successfully. Page will refresh...</Alert>
            :
            null
            }
            {fail ? 
            <Alert severity="error">{userFields[field]} could not be updated. {failMessage}</Alert>
            :
            null
            }
            <Grid item xs={8} className={ classes.inputField }>
                <TextField 
                placeholder={userFields[field]}
                value={value}
                onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
                <Button variant="outlined" onClick={updateField}>Submit</Button>
            </Grid>
        </Grid>
    )

}