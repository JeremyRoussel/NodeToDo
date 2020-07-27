const express = require('express');
const app = express();

// views
app.set('view engine', 'ejs')

//public
app.use(express.static('public'));

//routes
app.use(require('./routes/index')); // home page


app.listen(3000, () => {
    console.log(`Listening on Port 3000`)
})
