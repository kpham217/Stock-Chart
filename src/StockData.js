import React, { useState, useEffect } from 'react'
import { Getstockdata } from './getStockData';
import CandleStick from './DisplayCharts/CandleStick';
import AreaChart from './DisplayCharts/AreaChart'
import SearchArea from './SearchArea';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import classes from './styles/StockData.module.css';
import searchlogo from './imgs/search.png'
import axios from "axios";
const dataFile = require('./data/symbolFile.json')
export function Stockdata(props) {
    const [symbolData, setData] = useState([]);
    const [value, setValue] = React.useState('area');
   
    // console.log(csvJSON(symbolFile))
    const handleChange = (event) => {
        setValue(event.target.value);
        
    };

    // useEffect(async () => {
    //     async function fetchMyData() {
    //         const data = await Getstockdata();
    //         console.log(data);
    //         data.sort(function (a, b) {
    //             var dateA = new Date(a.date), dateB = new Date(b.date)
    //             return dateA - dateB
    //         });
    //         setData(data);
    //     }
    //     fetchMyData();
    //     const interval = setInterval(() => {

    //         try {
    //             async function fetchMyData() {
    //                 const data = await Getstockdata();
    //                 console.log(data);
    //                 setData(data);
    //               }
    //               fetchMyData();

    //         } catch (error) {
    //             console.log(error);
    //         }

    //     }, 60000 * 15);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div>
            {/* <div className="App"> */}
            <div ><SearchArea setData={setData}></SearchArea> </div>
            {symbolData.length > 0 ? (
                <div style={{position:'relative'}}>
                  
                    
                    <div className={classes.chartArea}> 
                    <h1  className={classes.stockName}>{symbolData[0].companyName}</h1>

                    <div style={{clear:'both'}}> 
                    <h1 className={classes.price}>{parseFloat(symbolData[99].close).toFixed(2)}</h1>
                    <span className={classes.currency}>USD</span>
                    <span className={(parseFloat(symbolData[99].close)-parseFloat(symbolData[0].close)).toFixed(2) > 0 ? classes.up : classes.down}>
                        {(parseFloat(symbolData[99].close)-parseFloat(symbolData[0].close)).toFixed(2)}  (
                            {(((parseFloat(symbolData[99].close)-parseFloat(symbolData[0].close)).toFixed(2)/parseFloat(symbolData[99].close))*100).toFixed(2)}%) 
                    </span>
                    </div>
                  
                    {value === 'area' ?   <AreaChart type={'hybrid'} data={symbolData} /> :  <CandleStick type={'hybrid'} data={symbolData} /> }
                  
                    <FormControl style={{ float: 'left', margin: '10px 10px 10px 50px' }} >
                        <FormLabel component="legend">Chart Type</FormLabel>
                        <RadioGroup style={{ float: 'left', display: 'inline-block' }} value={value} onChange={handleChange}>
                            <FormControlLabel value="area" control={<Radio />} label="Area Chart" />
                            <FormControlLabel value="candlestick" control={<Radio />} label="Candle Stick" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </div>) : <div><h1 className={classes.header}>Search any ticker to get a quote</h1>
                <img  src={searchlogo} className={classes.search} alt="search"/>

                </div>}

            {/* </div> */}
        </div>
    )
   
}
 