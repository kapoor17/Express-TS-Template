import express, { NextFunction, Request, Response } from 'express';
import { handlePostRequest } from '../controllers';
const router = express.Router();

router.post('/:world', handlePostRequest)

export default router;