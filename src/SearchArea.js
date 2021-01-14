import React from 'react'
// import SearchIcon from '@material-ui/icons/';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: 500,
        margin: 50,
    },
    //style for font size
    resize:{
      fontSize:30
    },
  }));
export default function Searcharea(props) {
    const classes = useStyles();


    return (
        <>
            <TextField
                className={classes.textField}
                id="input-with-icon-textfield"
                label="TextField"
                size="medium"
                variant='outlined'
                InputProps={{
                    classes: {
                        input: classes.resize,
                      },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}
