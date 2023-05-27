import express from 'express';
import {createImage,getImages} from '../controllers/image.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/listImages').get(protect,getImages)
router.route('/createImages').post(protect,createImage)

export default router;