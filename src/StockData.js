import React, { useState, useEffect } from 'react'
import { Getstockdata } from './getStockData';

export function Stockdata(props) {


    useEffect(async () => {
        async function fetchMyData() {
            const data = await Getstockdata();
            console.log(data);
          }
          fetchMyData();
        const interval = setInterval(() => {

            try {
                async function fetchMyData() {
                    const data = await Getstockdata();
                    console.log(data);
                  }
                  fetchMyData();
               
            } catch (error) {
                console.log(error);
            }
          
        }, 50000);
        return () => clearInterval(interval);
      }, []);

    return (
        <>
            
        </>
    )
}
