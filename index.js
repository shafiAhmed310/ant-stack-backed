const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app  = express();

//enabling cors policy

app.use(cors('*'));

//mongodb connection
require('./config/db')

// bodyparser middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json({
    limit: "20mb"
}));

//routes
const coupon = require('./routes/coupon.route');
app.use('/coupon',coupon);


//Error handling middleware
app.use((err,req,res,next)=>{
    res.status(500).json({error:true,
        message:'Internal server error'
        ,details:err.message})
})

app.get('/', (req, res) => {
    res.json({
        app: 'Coupon redeemer',
        path: '/'
    });
});
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
}).on('error',(err)=>{
    console.log(err.message)
})