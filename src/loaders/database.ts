import { client } from '../models/database';

const databaseLoader = async () => {
  try {
    await client.connect();
    console.log('Successfully connected to the Database!');
  } catch (err) {
    console.error('Could not connect to the Database! :(');
  }
};

export default databaseLoader;
