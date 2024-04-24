import { MongoClient } from 'mongodb';

/**
 * need to add this because we are not ivoking this function inside out express loader,
 * this is always compiling without the dotenv config
 * before the config setups the env
 */
require('dotenv').config();

const { MONGO_URI } = process.env;
export const client = new MongoClient(MONGO_URI || '');
export const db = client.db();
