import dotenv from 'dotenv';
dotenv.config();
import './database/index.js';
import Queue from './lib/Queue.js';
import ClientReg from './app/jobs/ClientReg.js';

Queue.process(ClientReg.handle);