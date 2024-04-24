import { MongoClient } from 'mongodb';

const databaseLoader = async () => {
  try {
    const { MONGO_URI = '' } = process.env;
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Successfully connected to the Database!');
  } catch (err) {
    console.error('Could not connect to the Database!');
    throw err;
  }
};

export default databaseLoader;
