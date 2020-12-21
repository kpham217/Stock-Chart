import React, { useState, useEffect } from 'react'
import { Getstockdata } from './getStockData';
import LineChart from 'react-linechart';

// import  LineChart from './LineChart';
export function Stockdata(props) {
    const [symbolData,setData] = useState({});
    const data = [
        {									
            color: "steelblue", 
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'green'},
            points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}] 
        }
    ];
    useEffect(async () => {
        async function fetchMyData() {
            const data = await Getstockdata();
            console.log(data);
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
          
        // }, 50000);
        // return () => clearInterval(interval);
      }, []);

    return (
        <div>
            <div className="App">
					<h1>My First LineChart</h1>
					<LineChart 
						width={600}
						height={400}
						data={data}
					/>
				</div>	
        </div>    
    )
}
