import {Request, Response } from 'express'
import db from '../database/database';
import jwt from 'jsonwebtoken';
import config from './../config/config'; 

class UsuariosController{
    
    public async list (req: Request, res: Response){
        if(req.Id_Rol == "1"){
            const usuarios = await  db.query('select * from usuarios where estado = 1');
        res.status(200).json(usuarios[0]);
        }
        else {
            res.status(401).json({mensaje: "Permisos insuficientes"});
        }
       
    }
    public async consultarUsuario(req:any, res:any){
        
        const {id} = req.params;
        const respuesta = await db.query('select fir_name, hab_trabajar, estado_servicio, estado_actual from usuarios where estado = true and id_login = ?',[id]);
            if(respuesta[0].length >0){
                return res.status(200).json(respuesta[0]);
            }
            res.status(404).json({text: " El Usuario no esta registrado" });
    }

    public async getOne(req:any, res:any){
        try {
            const g_res = await db.query('select nombre, foto,telefono, email, id_usuario, fecha_nacimiento, estado_servicio from usuarios where id_login = ? ',[req.body.id_login]);
            if(g_res[0].length >0 ){
                console.log(g_res[0][0])
                const token: string = jwt.sign({dato: g_res[0][0] } , config.jwsSecret);
                res.status(200).json(token); 
            }
            res.status(200).json([ {valor: "0"} ]);
        } catch (error) {
            console.log(error);
        }
    }
    
    public async create (req:Request, res:any): Promise <void> {
        try {
            const respuesta = await db.query('insert into usuarios set ?',[req.body]);
            //console.log(req.body);
            const id_login = req.body.id_login;
            const telefono = req.body.telefono;
            const hab_trabajar = req.body.hab_trabajar;
            if(respuesta.length >0) {
                const g_res = await db.query('select nombre, foto,telefono, email, id_usuario, fecha_nacimiento, estado_servicio from usuarios where id_login = ? and telefono = ?',[id_login, telefono]);
                await db.query('update usuarios set id_cli_usuario = ? where id_usuario = ?',[g_res[0][0].id_usuario, g_res[0][0].id_usuario]);
                console.log(g_res[0][0])
                if(hab_trabajar == 1){
                    console.log("Habilitado para trabajar")
                    await db.query('update usuarios set estado_actual = true where id_login = ?',[id_login]);
                }
                const token: string = jwt.sign({dato: g_res[0][0] } , config.jwsSecret);
                res.status(200).json(token); 
            }
            res.status(400).json({mensaje: "Error el insertar el usuario"});
        } catch (error) {
            console.log(error)
        }
            
    }
    public async update (req:any, res:any): Promise <void>{
        try {
                const {id} = req.params;
                const hab_trabajar = req.body.hab_trabajar;
                const respuesta = await db.query('update usuarios set ? where id_usuario = ?',[req.body, id]);
                if(respuesta.length >0) {
                    const g_res = await db.query('select nombre, foto,telefono, email, id_usuario, fecha_nacimiento, estado_servicio from usuarios where id_login = ? and telefono = ?',[id, req.body.telefono]);
                    await db.query('update usuarios set id_cli_usuario = ? where id_login = ?',[g_res[0][0].id_usuario, g_res[0][0].id_usuario]);
                    
                    if(hab_trabajar == 1){
                        console.log("Habilitado para trabajar")
                        await db.query('update usuarios set estado_actual = true where id_login = ?',[id]);
                    }
                    const token: string = jwt.sign({dato: g_res[0][0] } , config.jwsSecret);
                    res.status(200).json(token); 
                }
                res.status(400).json({mensaje: "Error el modificar el usuario"});
                
        } catch (error) {
            
        }
         
    }
    public async delete (req:any, res:any){
        if(req.Id_Rol == "1" || req.Id_Rol == "2"){
            const {id} = req.params;
            const respuesta = await db.query('update usuarios set estado = 0 where id_usuario = ?',[id]);
            if(respuesta.length >0) res.json({text: ' cliente: '+ req.params.id+' Eliminado'}); 
            res.status(400).json({mensaje: "Error el Eliminar usuario"});
            }
            else {
                res.status(401).json({mensaje: "Permisos insuficientes"});
            }
        
    }public async create_rel (req:Request, res:any): Promise <void> {
        try {
            await db.query('insert into referencias_personales set ?',[req.body]);
            const g_res = await db.query('select * from referencias_personales where id_usuario = ? ',[req.body.id_usuario]);
                console.log(g_res[0]);
            if(g_res.length >0) {
                res.status(200).json(g_res); 
            }
            res.status(400).json({mensaje: "Error el insertar el referencia"});
        } catch (error) {
            console.log(error)
        }
            
    }
    public async update_rel (req:any, res:any): Promise <void>{
        try {
            if(req.Id_Rol == "1" || req.Id_Rol == "2"){
                const {id} = req.params;
                const respuesta = await db.query('update usuarios set ? where id_usuario = ?',[req.body, id]);
            
                if(respuesta.length >0) res.json({text: 'Usuario editado: ' + req.params.id});
                res.status(400).json({mensaje: "Error el modificar el usuario"});
                }
                else {
                    res.status(401).json({mensaje: "Permisos insuficientes"});
                }
        } catch (error) {
            console.log(error);
        }
         
    }
    public async delete_rel (req:any, res:any){
     try {
            const {id} = req.params;
            const respuesta = await db.query('delete from usuarios where id_referencia = ?',[id]);
            if(respuesta.length >0) res.json({text: ' cliente: '+ req.params.id+' Eliminado'}); 
            res.status(400).json({mensaje: "Error el Eliminar usuario"});
     } catch (error) {
         console.log(error);
     }
        
    }
    public async get_rel (req:any, res:any){
       try {
           const respuesta = await  db.query('select * from referencias_personales where id_usuario = ?',req.params.id)
           console.log(respuesta[0]);
           if(respuesta.length >0 ){
               
               res.json(respuesta);
           }else{
            res.status(400).json({mensaje: "Error datos vacios"});
           }

       } catch (error) {
           console.log(error);
       }
    }
} 


export const usuariosController = new UsuariosController();
export default usuariosController;