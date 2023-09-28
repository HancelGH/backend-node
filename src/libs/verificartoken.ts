import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './../config/config';
interface IPayload {
    username_: String,
    id_rol_: String,
    iat: number,
    exp: number
}
export const TokenValidacion = (req: Request, res: Response, Next: NextFunction) =>{
    const token = req.headers['access-token'];
    console.log(req.body)
    if(!token) return res.status(401).json({mensaje: "Acceso denegado"});
    console.log(token)
    const payload = jwt.verify( token.toString() , config.jwsSecret) as IPayload;
    req.Id_Rol =  payload.id_rol_;
    Next();
}