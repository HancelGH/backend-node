
import config from './../config/config';
import {request, response } from 'express';
import * as bcrypt from "bcryptjs";
import db from '../database/database';
import jwt from 'jsonwebtoken';

class LoginController{
    
    public async list (req: Request, res: any){
        console.log('peticion de lista');
       const respuesta = await  db.query('select nombre, contraseña, (select nombre from empresas where id = empresa_id) as empresa,'+
       '(select nombre from roles where id = rol_id) as rol  from usuarios');
        res.json(respuesta[0]);
    }

    public async login (req:any, res:any){
     try {
        console.log('Login: ');
            //segmento de lectura de datos
        let  usuario_adm: any = [{
            hab_trabajar: 0,
            fir_name: 'Admin'
        }];

        let usuario = req.body.usuario;
        console.log('usuario: '+usuario);
        let pass = req.body.pass;
        console.log('pass '+pass);

        const passBd = await db.query('select pass from usuarios where nombre = ?', [usuario]);
        console.log(passBd[0][0].pass);
        if (pass == passBd[0][0].pass){
            res.status(200).json({ "estado": "Usuario valido", token: "fasdfasdfasdfasdfasdfasdfadfasdf"});

        } else {
            res.status(401).json({"estado": "El usuario y/o login no exsiste" });
        }
        

        //consulta a Base de datos
        /*const password = await db.query('select pass from usuarios where username = ?', [req.body.username]);
        console.log(password);
        
        if(password[0].length > 0){
           console.log(password[0][0].pass);
           const comparar = password[0][0].pass;
           let varrrr = await bcrypt.encodeBase64(pass,2);
           console.log(varrrr);
           const estado = await bcrypt.compare(pass,comparar);*/
           /*let estados = false;
           console.log(pass + ' = ' + password[0][0].pass)
           if (password[0][0].pass == pass) {
            console.log('true estados');
            estados= true;
           } else {
            console.log('veeerdadero');
             estados = false;
           };*/
           /*console.log(estado);
            if (estado){
                console.log('estado verdadero')
                const campos = await db.query('select id_login,id_rol from login where username = ?', [username]);
                console.log('Realiza la consulta a la tabla de login')
                const id_rol = campos[0][0].id_rol;
                const id_login = campos[0][0].id_login;
                
                console.log(id_rol);
                    if(id_rol == 1){
                        const token: string = jwt.sign({username_: username, id_rol_: id_rol, id_login: id_login, usuario: usuario_adm} , config.jwsSecret,{
                            expiresIn: 60*60*12
                        });
                        res.status(200).json(token)
                    } else{
                        // consulta para obtener datos y saber si es empleado y sus estados.
                        console.log(campos[0][0].id_login)
                        const usuario_ = await db.query('select fir_name, hab_trabajar, estado_actual,id_usuario from usuarios where estado = 1 and id_login = ?', [campos[0][0].id_login]);
                        console.log(usuario_[0][0]);
                        const token: string = jwt.sign({ username_: username, usuario: usuario_[0],id_rol_: id_rol,id_login: id_login } , config.jwsSecret,{
                            expiresIn: 60*60*24
                        });
                        res.status(200).json(token) 
                    }
            }
        }else{
            res.status(401).json({text: "El usuario y/o login no exsiste" }); 
        } */

     } catch (error) {
         console.log(error)
     }
    }

    public async create_login (req:any, res:any) { 
        // segmento para insertar un nuevo usuario
           let username_ = req.body.username;
           let pass_ = req.body.pass; 
           let rol_ = req.body.id_rol;
           if(rol_ != 1){
            rol_ = 2;
           }
            pass_ = bcrypt.hashSync(pass_, 8);
            var user: any = ({
            username: username_,
            pass : pass_,
            id_rol : rol_
            }); 
            console.log("Inciando insercion");
        const inser = await db.query('insert into login set ? ',[user]);
        const respuesta = await db.query('select id_login from login where username = ?',[user.username]);
        console.log(respuesta[0][0].id_login);
        //segmento para crear el token
        const token: string = jwt.sign({id_login:respuesta[0][0].id_login, username_: user.username, id_rol_: user.id_rol}, config.jwsSecret);
        if(inser.length >0){
            res.status(200).json(token)
        }else{
            res.status(403).send({message: 'error al crear login'}); 
        }
         
    }

    public async update (req:any, res:any): Promise <void>{
        const {id} = req.params;
        await db.query('update login set ? where id = ?',[req.body, id]);
        res.json({text: 'editando login: ' + req.params.id}); 
    }
    public async delete (req:any, res:any){
        const {id} = req.params;
        await db.query('update login set estado = 0 where id_login = ?',[id]);
        res.json({text: ' Login: '+ req.params.id+' Eliminado'}); 
    }

    public async dat (req:any, res:any){
        try {
                const id_login = req.body.id_login;
                const resp = await db.query('select id_rol, username from login where id_login = ?',[id_login]);
                const username = resp[0][0].username;
                const id_rol = resp[0][0].id_rol;
                const usuario_ = await db.query('select fir_name, hab_trabajar, estado_actual,id_usuario from usuarios where estado = 1 and id_login = ?', [id_login]);
                console.log(usuario_[0][0]);
                const token: string = jwt.sign({ username_: username, usuario: usuario_[0],id_rol_: id_rol,id_login: id_login } , config.jwsSecret,{
                expiresIn: 60*60*24
                });
                res.status(200).json(token) 
        } catch (error) {
            console.log(error)
        }
       }
}

export const loginController = new LoginController();
export default loginController;