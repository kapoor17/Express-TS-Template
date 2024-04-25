import { connect } from 'mongoose';

const databaseLoader = async (MONGO_URI: string) => {
  try {
    return await connect(MONGO_URI).then(() =>
      console.log('Successfully connected to the Database!')
    );
  } catch (err) {
    console.error('Could not connect to the Database! :(');
    throw err;
  }
};

export default databaseLoader;
