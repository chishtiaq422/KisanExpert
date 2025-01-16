import { Request, Response, NextFunction, Router } from 'express';
import { CheckUserDetails, createUser } from '../services/auth';
import { AuthDto, AuthResponseDto, RegisterDto } from '../models/user';
import {GenerateToken } from '../helpers/authenticationHelper';
export  const authRoute = Router();

authRoute.post('/auth', async function(req:Request, res:Response, next:NextFunction) {
    try {
       let authDto:AuthDto = req.body;
      let response= await CheckUserDetails(authDto);
      if(response == null || response.IsSuccess==false)
      {
         res.status(401).json({IsSuccess: response.IsSuccess, ErrorDetails: response.ErrorDetails} );
         return;
      }
      else
      {
         var authResponse= new AuthResponseDto();
         authResponse.Token=  GenerateToken(response);
         authResponse.IsSuccess=true;
          res.status(200).json(authResponse);
          return;
      }
    } catch (err:any) {
       res.status(500).json({IsSuccess: false, ErrorDetails: err.message});
       return;
    }
});


authRoute.post('/register', async function(req:Request, res:Response, next:NextFunction) {
    try {
       let authDto:RegisterDto = req.body;
      let response= await createUser(authDto);
      if(response == null || response.IsSuccess==false)
      {
         res.status(400).json({IsSuccess: response.IsSuccess, ErrorDetails: response.ErrorDetails} );
         return;
      }
      else
      {
          res.status(200).json(response);
          return;
      }
    } catch (err:any) {
       res.status(500).json({IsSuccess: false, ErrorDetails: err.message});
       return;
    }
});



