import express from 'express';
import { signup,signin } from '../controllers/user.js';
const router=express.Router();
import protect from '../middleware/authMiddleware.js'


router.post('/signup',signup)
router.post('/signin',signin)


export default router;