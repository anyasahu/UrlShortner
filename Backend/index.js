import express from 'express';
import  mongoose from 'mongoose';
import cors from 'cors';
import {nanoid} from 'nanoid';
import dotenv from 'dotenv';
dotenv.config()

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log("DB connected successfully"))
.catch((err)=>console.log("failed to connect database",err))

const urlSchema = new mongoose.Schema({
    originalUrl:String,
    shortUrl:String,
    clicks:{type:Number,
        default:0},
    });

    const Url=mongoose.model('url',urlSchema)

    app.post('/api/short',async(req,res)=>{
        console.log('POST /api/short body:', req.body);
        try{
        const originalUrl = req.body.originalUrl;
        if(!originalUrl) return res.status(400).json({error:'original error'});
        const shortUrl=nanoid(8);
        const url =  new Url({originalUrl,shortUrl});
            await url.save();
            return res.status(200).json({message: "URL generated", url:url})
        }catch(error){
            console.log("POST /api/short failed:",error);
            res.status(500).json({error:error.message || 'server error'});
        }
    })
app.get('/:shortUrl',async(req,res)=>{
    console.log(req.params)
    try{
        const {shortUrl}=req.params;
        const url=await Url.findOne({"shortUrl":shortUrl});
       if(url){
        url.clicks++;
        await url.save();
        return res.redirect(url.originalUrl)
       }else{
        return res.status(404).json({error:'URL not found'});
       }
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Server error'});
    }
    res.send("success")
})
app.listen(3000,()=>console.log("server is running on port 3000"));