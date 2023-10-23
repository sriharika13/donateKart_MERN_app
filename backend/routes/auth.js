const express= require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
require('dotenv').config(); // Load environment variables from .env file


const router= express.Router()

router.post('/register', async(req, res)=>{
    const {name, password, email}= req.body
    try{
        const hashedPwd= await bcrypt.hash(password, 10)
        const user= new userModel({
            name: name,
            email: email,
            password: hashedPwd
        })
        await user.save()
        res.json({status: 'ok'})
    }catch(err){
        res.json({status: 'error', error: 'Duplicate email'})
    }
})

router.post('/login', async(req, res)=>{
    const {email, password}= req.body
    try{
        const user= await userModel.findOne({email: email})
        if(!user){
            return res.json({status: 'error', error: "Invalid login"})
        }
        const isPwdValid= await bcrypt.compare(password, user.password)
        if(isPwdValid){
            const token= jwt.sign({
                name: user.name,
                email: user.email
            }, `${process.env.JWT_SECRET}`, {expiresIn: '10m'})
            return res.json({status: 'ok', user: token})
        }else{
            return res.json({status:  'ok', user: false, message: "username or email is wrong"})
        }
    }catch(err){
        return res.json({status: 'error', user: false})
    }
})


module.exports= router