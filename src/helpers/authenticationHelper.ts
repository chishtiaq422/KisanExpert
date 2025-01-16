import { NextFunction, Request, Response } from "express";
import fs from 'fs';
import path from "path";
import * as jwt from 'jsonwebtoken';
import { SignOptions } from "jsonwebtoken";
import { User } from "../models/user";
import { StatusModel } from "../models/StatusDto";
import { JWT_SECRET } from "../config";

export default function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      res.sendStatus(401).json({ IsSuccess:true, ErroDetails:"You don't have permission to access this route."});
      return;
    }
    const result = verifyAccessToken(token);
  
    if (!result.IsSuccess) {
      res.status(403).json(result);
      return ;
    }
  
    //req.user = result.data;
    next();
}


function verifyAccessToken(token:string): StatusModel {
    var result=  new StatusModel();
    const secret = JWT_SECRET;
    try {
      var decoded:any = jwt.verify(token, secret);
      if(decoded.exp >=  Math.floor(new Date().getTime()/1000))
      {
      result.IsSuccess=true;
      }
    } catch (error:any) {
      result.ErrorDetails=error.message;
    }
    return result;
  }


  export function GenerateToken(userDetails: User) : string
  {
    const payload =  JSON.stringify(userDetails);
    const secret = JWT_SECRET;
    const options : SignOptions= { expiresIn: 3600,issuer: 'admin.3u.gg',algorithm: "HS512" };
    return jwt.sign({user: payload}, secret, options);
  }

 export function decodeAccessToken(req:Request): User {
    var result=  new User();
    try {
      var authHeader= req.headers['authorization'];
      const token:any = authHeader && authHeader.split(' ')[1];
       if(verifyAccessToken(token).IsSuccess)
       {
       var decoded : any=jwt.decode(token);
       result=JSON.parse(decoded.user);
       result.IsSuccess=true;
       }
    } catch (error:any) {
       result.ErrorDetails=error.message;
    }
    return result;
  }

  export function IsGovtOfficial(req:Request, res:Response, next:NextFunction)
  {
    try{
    var result=  decodeAccessToken(req);
    if(result.IsSuccess && result.IsGovtAgency)
    {
      next();
    }else{
      res.status(401).json({ IsSuccess:false, ErroDetails:"You are unauthorized to get this resource."});
    }
  }
  catch(error:any)
  {
    res.status(500).json({ IsSuccess:false, ErroDetails:error.message});
    return;
  }
  }

  export function IsFarmer(req:Request, res:Response, next:NextFunction)
  {
    try{
    var result=  decodeAccessToken(req);
    if(result.IsSuccess && result.IsFarmer)
    {
      next();
    }else{
      res.status(401).json({ IsSuccess:false, ErroDetails:"You are unauthorized to get this resource."});
    }
  }
  catch(error:any)
  {
    res.status(500).json({ IsSuccess:false, ErroDetails:error.message});
    return;
  }
  }

  export function IsVendor(req:Request, res:Response, next:NextFunction)
  {
    try{
    var result=  decodeAccessToken(req);
    if(result.IsSuccess && result.IsVendor)
    {
      next();
    }else{
      res.status(401).json({ IsSuccess:false, ErroDetails:"You are unauthorized to get this resource."});
    }
  }
  catch(error:any)
  {
    res.status(500).json({ IsSuccess:false, ErroDetails:error.message});
    return;
  }
  }


 

  export function SendUnAuthResponse(res: Response)
  {
    return res.status(401).json({ IsSuccess:true, ErroDetails:"You are unauthorized to get this resource."});
  }

