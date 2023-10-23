const express= require('express')
const cors= require('cors')
const auth= require('./routes/auth')
const donate= require('./routes/donate')
const checkout= require('./routes/checkout')
const mongoose = require('mongoose')
require('dotenv').config(); // Load environment variables from .env file

const PORT= process.env.PORT || 8080
const app= express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use('/api', auth)
app.use('/api/donate', donate)
app.use('/api/create-checkout-session', checkout)

app.listen(PORT, ()=>{
    console.log(`server runnning on PORT ${PORT}`)
})