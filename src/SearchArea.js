import React from 'react'
// import SearchIcon from '@material-ui/icons/';
import { Getstockdata } from './getStockData';
import { TextField, ListItem, List, Paper } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import classes from './styles/SearchAreaStyle.module.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;
const dataFile = require('./data/symbolFile.json')

axios.get('https://stockchart.azurewebsites.net/api').then(res => {
    // axios.get('http://localhost:3001/api').then(res => {

    console.log(res.data)
    console.log('test')
})
const useStyles = makeStyles((theme) => ({
    textField: {
        float: 'left',
        width: 1000,
        margin: '30px 0 10px 0px',
        // position: 'relative'
    },
    //style for font size
    resize: {
        fontSize: 20
    },
}));
const match = (s) => {
    const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
    const re = RegExp(p);

    return dataFile.filter(v => v.Symbol.toLowerCase().match(re));
};
export default function Searcharea({ setData }) {
    const uiclasses = useStyles();
    const [searchValue, setSearch] = useState('');
    const [resultList, setResList] = useState([]);
    const [tickerSelected, setTicker] = useState({
        tickerSymbol: '',
        companyName: ''
    });
    useEffect(async () => {
        if (tickerSelected != '') {
            async function fetchMyData() {
                const data = await Getstockdata({ ...tickerSelected });
                console.log(data);
                data.sort(function (a, b) {
                    var dateA = new Date(a.date), dateB = new Date(b.date)
                    return dateA - dateB
                });
                setData(data);
                setSearch('');
            }
            console.log('executing')
            fetchMyData();
            // const interval = setInterval(() => {

            //     try {
            //         async function fetchMyData() {
            //             const data = await Getstockdata(tickerSelected);
            //             console.log(data);
            //             setData(data);
            //           }
            //           fetchMyData();

            //     } catch (error) {
            //         console.log(error);
            //     }

            // }, 60000 * 15);
            // return () => clearInterval(interval);
        }

    }, [tickerSelected]);
    const handleChange = (e) => {
        setSearch(e.target.value);

        // console.log(searchValue)
    }
    useEffect(() => {
        if (searchValue !== "") {
            console.log(searchValue.length);

            const newList = dataFile.filter(item => {
                var checker = false;
                for (let i = 0; i < searchValue.length; i++) {

                    if (item.Symbol.charAt(i).toLowerCase() == searchValue.charAt(i).toLowerCase())
                        checker = true;
                    else { checker = false; break; }
                }
                return checker;
            });
            // console.log(newList.slice(0,10))
            setResList(newList.slice(0, 10))
        }

        // const newList = match(searchValue.toLowerCase())
    }, [searchValue])

    return (
        <>
            <div className={classes.wrapper}>
                <TextField
                    className={uiclasses.textField}
                    id="input-with-icon-textfield"
                    label="Search your ticker"
                    size="medium"
                    variant='outlined'
                    value={searchValue}
                    onChange={handleChange}
                    InputProps={{
                        classes: {
                            input: uiclasses.resize,
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {
                    searchValue !== "" ? <Paper style={{ maxHeight: 200, overflow: 'auto', width: 1000 }}>
                        <List>

                            {resultList.map(ticker => <ListItem button key={ticker.Symbol} value={ticker.Symbol} onClick={() => setTicker({
                                tickerSymbol: ticker.Symbol,
                                companyName: ticker.Name
                            })}>{ticker.Symbol}</ListItem>)}
                        </List>
                    </Paper> : null
                }


            </div>
        </>
    )
}
