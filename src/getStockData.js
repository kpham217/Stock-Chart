import React, { useState, useEffect } from 'react'
export async function Getstockdata(symbol) {
    const API_KEY = 'H21T6LC1K3QPU5EI'
    const stock_symbol = 'TSLA'
    let period = [];
    let closeValues = [];
    let openValues = [];
    let highValues = [];
    try{
        console.log('executed');
        await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock_symbol}&interval=5min&apikey=${API_KEY}`)
        .then(function(res) {
            return res.json();
        }).then(data => {
            console.log(data)
            for (let x in data['Time Series (5min)']){
                period.push(x);
                closeValues.push(data['Time Series (5min)'][x]['4. close']);
                openValues.push(data['Time Series (5min)'][x]['1. open']);
                highValues.push(data['Time Series (5min)'][x]['2. high']);
            }
        })
    
    }catch (e) {
        console.log(e)
        
    }
    const resultdata = {
        stock_symbol,
        timeValues : period,
        closeValues,
        openValues,
        highValues,
    };
    return resultdata;
}
