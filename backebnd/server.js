import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import cookieParser from 'cookie-parser' 
import cors from 'cors'
import path from 'path'

import userRoute from './routes/user.route.js'
import blogRoute from './routes/blog.route.js'
import authRoute from './routes/auth.routes.js'
import commentsRoute from './routes/comments.routes.js'
dotenv.config()
const app = express()
const PORT=process.env.PORT||3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://mern-stack-blog-mbxc.onrender.com",
    credentials:true
}))

const _dirname=path.resolve()
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user",userRoute)
app.use("/api/v1/blog",blogRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/comment',commentsRoute)


app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(_dirname, "/frontend/dist/index.html"));
});
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server listening at PORT: ${PORT}`);
    
})