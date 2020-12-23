import React, { useState, useEffect } from 'react'
import { Getstockdata } from './getStockData';
// import LineChart from 'react-linechart';
import Chart from './AreaChart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import classes from './ChartComponent.module.css';
// import  LineChart from './LineChart';
export function Stockdata(props) {
    const [symbolData, setData] = useState([]);
    const data = [
        {
            color: "steelblue",
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'green' },
            points: [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]
        }
    ];
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
            <div className="App">
                    {symbolData.length > 0 ? (
                    <div className={classes.chartWrapper}> 
                    <h1 >{symbolData[0].stock_symbol}</h1>
                   <Chart type='canvas + svg' data={symbolData} />
                </div>) : null}
                
            </div>
        </div>
    )
}
