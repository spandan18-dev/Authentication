import {Router} from 'express';
const authRouter = Router();

import * as auth from '../controllers/auth.controler.js'

// api/auth/register
authRouter.post('/register',auth.regester);

// api/auth/refreshToken
authRouter.get('/refreshToken',auth.refreshToken)


export default authRouter;