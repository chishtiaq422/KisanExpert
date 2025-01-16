import express, { Express, Request, Response , Application, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import https from 'https';
import fs from 'fs';
import sequelizedb from './helpers/db';
//import { allowedOrigins } from './config';
import * as routes from './router';

sequelizedb.isConnected();
//let allowedOrigins: string[] = allowedOrigins;
// var corsOptions = {
//   origin: (origin:any, callback:Function) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   },
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


let port :number =  9500;

routes.useRoutes(app);

app.listen(port,  () => {
  console.log(`FHP app listening on port ${port}`)
});