import Queue from 'bull';
import redisConfig from '../config/redis.js';

import ClientReg from '../app/jobs/ClientReg.js';

const clientQueue = new Queue(ClientReg.key, redisConfig);

clientQueue.on("failed", (job,err) => {
    console.log('Job failed', job.name, job.data);
    console.log(err);
});

export default clientQueue;

