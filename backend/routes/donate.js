const express= require('express')
const axios = require('axios');
const jwt = require('jsonwebtoken')
const causesArr= require('../causes.json')

require('dotenv').config(); // Load environment variables from .env file


const router= express.Router()

router.post('/selectedCause', async(req, res)=>{
    const {selectedCause, searchTerm}= req.body
    if(searchTerm){
        const response= await axios.get(`https://partners.every.org/v0.2/search/${searchTerm}?apiKey=${process.env.CHARITY_API}&causes=${selectedCause}`)
        res.json({status: 'ok', data: response.data})
    }else if(!searchTerm && selectedCause){
        const response= await axios.get(`https://partners.every.org/v0.2/browse/${selectedCause}?apiKey=${process.env.CHARITY_API}`)
        res.json({status: 'ok', data: response.data})
    }
  }
)

router.get('/', async(req, res)=>{
    const token= req.headers['x-access-token']
    try{
        const decoded= jwt.verify(token, `${process.env.JWT_SECRET}`)
        // const email= decoded.email
        // const user= await userModel.findOne({email: email})

        const data={
            causes: causesArr
        }
        return res.json({status: 'ok', data: data})
    }catch(err){
        console.log(err)
        return res.json({status: 'error', error: "Invalid Token"})
    }
})


module.exports= router