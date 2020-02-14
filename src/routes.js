import Router from 'express';
import multer from 'multer';
import storage from '../src/config/multer.js';

import ClientController from "./app/controllers/ClientController.js";
import UserController from './app/controllers/UserController.js';

const routes = new Router();
const upload = multer({storage : storage});

routes.post('/clients/upload', upload.single('file'), ClientController.upload);
routes.put('/clients', ClientController.update);
routes.get('/users/:code/clients', UserController.getAllClients);
routes.delete('/users/:code', UserController.delete); 

export default routes;