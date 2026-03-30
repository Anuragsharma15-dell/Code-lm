
import jwt from "jsonwebtoken"

 import type { Request, Response } from "express";


 


 
export function authmiddleware(req:Request, res:Response){

 const token = req.headers.authorization!.split("")[0];
 if(!token){
    return res.status(400).json({
        message:"token is invalid"
    })
 }

 const decoded  = jwt.decode(token);
 if(!decoded?.sub){
    res.status(400).json({
        message:"sub not found"
    })

   
 }


 if(!decoded){
    return res.status(400).json({
        message:"token is invalid"
    })
 }

 
 req.body.user = decoded.sub;

console.log(decoded?.sub);


return res.status(201).json({
    token

})




 
}