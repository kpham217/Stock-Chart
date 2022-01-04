const express = require("express");
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;
const app = express();
app.use('/', (req,res) => {
    res.send('abd')
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });