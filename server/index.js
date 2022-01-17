const express = require("express");
const cors = require("cors")
// app.use(express.json());
const bodyParser = require('body-parser')

// app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(cors({
//     // origin: "http://localhost:3000",
//     // origin: "*",
//     origin: "https://stockchart.azurewebsites.net",
//     credentials: true
// }))
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://stockchart.azurewebsites.net']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const path = require('path')
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));
console.log(`${__dirname}`)
app.get('/api', (req,res) => {
    res.send({mEssage : "success"})
})
app.get('/*', (req, res)=>{  res.sendFile(path.join(__dirname, '../build', 'index.html'));})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} ${path.join(__dirname, '../build/index.html')}`);
  });