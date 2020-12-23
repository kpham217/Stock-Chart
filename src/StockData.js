import React, { useState, useEffect } from 'react'
import { Getstockdata } from './getStockData';
// import LineChart from 'react-linechart';
import Chart from './AreaChart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import classes from './ChartComponent.module.css';
// import  LineChart from './LineChart';
export function Stockdata(props) {
    const [symbolData, setData] = useState([]);
  
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
        // const interval = setInterval(() => {

        //     try {
        //         async function fetchMyData() {
        //             const data = await Getstockdata();
        //             console.log(data);
        //             setData(data);
        //           }
        //           fetchMyData();

        //     } catch (error) {
        //         console.log(error);
        //     }

        // }, 60000 * 5);
        // return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* <div className="App"> */}
                    {symbolData.length > 0 ? (
                    <div style={{position: 'relative'}} 
                    // className={classes.chartWrapper}
                    > 
                    <h1 >{symbolData[0].stock_symbol}</h1>
                    <TypeChooser>
				{type => <Chart type={type} data={symbolData} />}
			</TypeChooser>
                </div>) : null}
                
            {/* </div> */}
        </div>
    )
}
