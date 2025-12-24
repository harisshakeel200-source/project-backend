import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(cors({
    origin: [
        "https://admin-panel-coral-one.vercel.app",
        "https://your-user-frontend.vercel.app"
    ],
    credentials: true,
}))

// Handle preflight OPTIONS requests
app.options("*", cors())


app.use(express.json())




// API Endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
    res.status(200).json({ message: "API Working" })
})


app.listen(port, ()=> console.log('Server started on PORT : '+ port))