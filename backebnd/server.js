import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import cookieParser from 'cookie-parser' 
import cors from 'cors'
import userRoute from './routes/user.route.js'
dotenv.config()
const app = express()
const PORT=process.env.PORT||3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user",userRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server listening at PORT: ${PORT}`);
    
})