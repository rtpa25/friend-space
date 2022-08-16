import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

export const connect = async () => {
  const dbUri = config.get<string>('dbUri');

  console.log(dbUri);

  try {
    await mongoose.connect(dbUri);
    logger.info('connected to DB 😎');
  } catch (e) {
    logger.error('error while connecting to DB', e);
    process.exit(1);
  }
};
