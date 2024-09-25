import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js'; 
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router();

router.post('/Signup', async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email }); // Changed to findOne
    if (user) {
        return res.json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name, // Ensure you save the name too
        email,
        password: hashPassword, // Ensure this is the hashed password
    });

    await newUser.save();
    return res.json({ status:true, message: "Record registered" });
});

router.post('/Signin',async (req, res)=>{
    const {email,password} = req.body;
    const user  = await User.findOne({email})
    if(!user){
        return res.json({message: "user is not Registered"})
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: "password is incorrect"})
    }

    const token  = jwt.sign({name: user.name},process.env.KEY,{expiresIn: '1h'})
    res.cookie('token',token, {httpOnly:true, maxAge: 360000})
    return res.json({status:true, message:"Signin Successsfully"})
})
router.post('/forgot-password',async (req,res)=>{
    const {email}=req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({message: "user not registered"})
        }

        const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn:"5m"})

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'rl2q lgjd 567f v4tz g2kd 532n 4ezm 752f'
        }
        });

        var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    }catch(err){
        console.log(err)
    }

})
export default router; 
