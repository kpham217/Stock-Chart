import logo from './logo.svg';
import './App.css';
import { Getstockdata } from './getStockData';
import {Stockdata} from './StockData';
function App() {
  // Stockdata();
  return (
    <div className="App">
     <Stockdata />
    </div>
  );
}

export default App;
