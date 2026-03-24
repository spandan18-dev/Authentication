import express from 'express';
import morgan from 'morgan';
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

// Routes
import authRouter from '../src/routes/user.routes.js'

//api
app.use('/api/auth',authRouter);

export default app;