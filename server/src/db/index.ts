import mongoose from 'mongoose'
import * as models from './models';
import { IConfig } from '../config';

export {models}

export function connectDb(config: IConfig): void {
  mongoose.connect(config.getDbUri(),(err) => {
    if (err){
      console.log(err)
    }
    else {
      console.log('Connected to MongoDB')
    }
  })
}

export default {
  models,
  connectDb
}