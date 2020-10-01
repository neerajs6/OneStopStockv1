import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: '#d9d9d9',

    }

}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={ classes.footer }>
            Footer
        </footer>
    )
}