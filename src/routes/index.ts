import express, { NextFunction, Request, Response } from 'express';
import { errorProneRequest, handlePostRequest, handleGetRequest } from '../controllers';
const router = express.Router();

router.get('/', handleGetRequest)
router.post('/:world', handlePostRequest)
router.get('/error', errorProneRequest)

export default router;