import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
import authRouter from '../src/routes/user.routes.js'


//api
app.use('/api/auth',authRouter);

export default app;