import express, { NextFunction, Request, Response } from 'express';
import { errorProneRequest, handlePostRequest } from '../controllers';
const router = express.Router();

router.post('/:world', handlePostRequest)
router.get('/error', errorProneRequest)

export default router;