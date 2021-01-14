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
const dataFile = require('./data/symbolFile.json')
export function Stockdata(props) {
    const [symbolData, setData] = useState([]);
    const [value, setValue] = React.useState('area');
   
    // console.log(csvJSON(symbolFile))
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(async () => {
        async function fetchMyData() {
            const data = await Getstockdata();
            console.log(data);
            data.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateA - dateB
            });
            setData(data);
        }
        fetchMyData();
        const interval = setInterval(() => {

            try {
                async function fetchMyData() {
                    const data = await Getstockdata();
                    console.log(data);
                    setData(data);
                  }
                  fetchMyData();

            } catch (error) {
                console.log(error);
            }

        }, 60000 * 15);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* <div className="App"> */}
            {symbolData.length > 0 ? (
                <div style={{ position: 'relative' }}
                // className={classes.chartWrapper}
                >
                    <SearchArea></SearchArea>
                    <h1 >{symbolData[0].stock_symbol}</h1>
                    {value === 'area' ?   <AreaChart type={'hybrid'} data={symbolData} /> :  <CandleStick type={'hybrid'} data={symbolData} /> }
                  
                    <FormControl style={{ float: 'left', margin: '10px 10px 10px 50px' }} >
                        <FormLabel component="legend">Chart Type</FormLabel>
                        <RadioGroup style={{ float: 'left', display: 'inline-block' }} value={value} onChange={handleChange}>
                            <FormControlLabel value="area" control={<Radio />} label="Area Chart" />
                            <FormControlLabel value="candlestick" control={<Radio />} label="Candle Stick" />
                        </RadioGroup>
                    </FormControl>
                </div>) : null}

            {/* </div> */}
        </div>
    )
   
}
