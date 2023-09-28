import {Request, Response } from 'express'
import db from '../database/database';

class CoreController{
    
    public async list (req: Request, res: Response){
        try {
            const lat = req.body.lat;
            const lng = req.body.lng;
            const dist = req.body.dist;
            const id_servicio = req.body.id_servicio;
            let consulta = "call call_servicio("+lat+", "+lng+" ,"+dist+" ,"+id_servicio+")";
            console.log(consulta);
            const respuesta = await  db.query(consulta);
            //console.log (respuesta);
            if(respuesta[0][0].length >0){
                res.status(200).json(respuesta[0][0]);
            }
            else{
                res.status(400).json({mensaje: "error"});
            }

        } catch (error) {
            console.log(error)
        }
    }

public async core_list (req: Request, res: Response){
    try {
        const lat = req.body.lat;
        const lng = req.body.lng;
        const dist = req.body.dist;
        const id_servicio = req.body.id_servicio;
        let consulta = "call call_servicio("+lat+", "+lng+" ,"+dist+" ,"+id_servicio+")";
        console.log(consulta);
        const respuesta = await  db.query(consulta);
        //console.log (respuesta);
        if(respuesta[0][0].length >0){
            res.status(200).json(respuesta[0][0]);
        }
        else{
            res.status(400).json({mensaje: "error"});
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: "error"});
    }
}

    public async trabajos_externos (req: Request, res: Response){
        try {
            const id_usuario_= req.params.id;
            console.log(id_usuario_);
            const respuesta = await db.query('call trabajos_externos(?)',[id_usuario_]);
            console.log(respuesta[0][0]);
            if(respuesta[0].length >0) {
                res.status(200).json(respuesta[0]);
            }else{
                res.status(400).json({mensaje: "error"});
            }

        } catch (error) {
            console.log(error);
            console.log("Solucionado")
            res.status(400).json({mensaje: "error"});
        }
    }
    public async trabajo_general (req: Request, res: Response){
        try {
            const id_usuario_= req.body.id_usuario;
            const id_servicio = req.body.id_servicio
            console.log(id_usuario_);
            const respuesta = await db.query('call trabajos_general(?,?)',[id_usuario_,id_servicio]);
            console.log(respuesta[0][0]);
            if(respuesta[0].length >0) {
                res.status(200).json(respuesta[0]);
            }else{
                res.status(400).json({mensaje: "error"});
            }

        } catch (error) {
            console.log(error);
            console.log("Solucionado")
            res.status(400).json({mensaje: "error"});
        }
    }
    public async trabajos_externos_servicio (req: Request, res: Response){
        try {
            const id_usuario_= req.params.id;
            const id_servicio_ = req.params.id_servicio;
            console.log(id_usuario_);
            const respuesta = await db.query('call trabajos_externos_servicio(?, ?)',[id_usuario_, id_servicio_]);
            console.log(respuesta[0][0]);
            if(respuesta[0].length >0) {
                res.status(200).json(respuesta[0]);
            }else{
                res.status(400).json({mensaje: "error"});
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    public async crear_trabajos_externos (req: Request, res: Response){
        try {
            
            console.log(req.body);
            const rr = await db.query('insert into experiencia set ?',[req.body]);
            const id_hab = req.body.id_habilidad;
            const desc = req.body.descripcion;
            const respuesta1 = await db.query('select id_experiencia from experiencia where id_habilidad = ? and descripcion = ?',[id_hab, desc]);    
            console.log("prueba de inserecion 2")
            console.log(respuesta1);
            if(respuesta1.length > 0){
                res.status(200).json(respuesta1[0]);
            }else{
                res.status(400).json({mensaje: "error"});
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    public async crear_trabajos_externos_dat (req: Request, res: Response){
        try {
            const respuesta = await db.query('insert into trabajos_externos set ?',[req.body]);
            console.log(respuesta[0]);
            if(respuesta.length >0) {
                res.status(200).json(respuesta[0]);
            }else{
                res.status(400).json({mensaje: "error"});
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    public async create_itrab (req:Request, res:any): Promise <void> {
     try {
        const rr = await db.query('call crear_trabajo(?,?,?,?,?,?,?,?,?,?)',[req.body.id_hab,req.body.descripcion, req.body.descripcion_ex,
                                                                           req.body.id_usuario_cli, req.body.estado_solicitud ,
                                                                           req.body.estado_general, req.body.domicilio_cl,req.body.domicilio_pr,
                                                                           req.body.id_usuario_pr , req.body.estado_servicio ]);
        //console.log(req.body);
        if(rr.length >0) res.status(200).json(rr[0]); 
        res.status(400).json({mensaje: "Error el crear trabajo"}); 
     } catch (error) {
         console.log(error);
     }   
    }
    public async status_create (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call aceptar_rechazar_trabajo(?,?)',[req.body.id_trab,req.body.estado_general]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json("EXITO"); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }
       public async status_rech (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call status_rech(?)',[req.body.id_trab]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json("EXITO"); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }
       public async update_trab (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call actualizar_trabajo(?,?)',[req.body.id_trab,req.body.porcentaje]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json(rr[0]); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }
       public async consulta_trabajos_pr (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call trabajos_iniciados(?)',[req.params.id]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json(rr[0]); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }
       public async consulta_trabajos_cl (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call trabajos_iniciados_cl(?)',[req.params.id]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json(rr[0]); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }

    public async finalizar_trab_cl (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call finalizar_trabajo_cl(?,?,?,?)',[req.body.id_trab,req.body.precio, req.body.comentario_ex,req.body.valoracion]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json(rr[0]); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }
       public async finalizar_trab_pr (req:Request, res:any): Promise <void> {
        try {
           const rr = await db.query('call finalizar_trabajo_pr(?,?)',[req.body.id_trab,req.body.valoracion]);
           //console.log(req.body);
           if(rr.length >0) res.status(200).json(rr[0]); 
           res.status(400).json({mensaje: "Error el crear trabajo"}); 
        } catch (error) {
            console.log(error);
        }   
       }
    /*
    
    public async consultarUsuario(req:any, res:any){
        
        const {id} = req.params;call trabajos_externos_servicio(3,6);
        const respuesta = await db.query('select fir_name, hab_trabajar, estado_servicio, estado_actual from usuarios where estado = true and id_login = ?',[id]);
            if(respuesta[0].length >0){
                return res.status(200).json(respuesta[0]);
            }
            res.status(404).json({text: " El Usuario no esta registrado" });
    }

    public async getOne(req:any, res:any){
        const {id} = req.params;
        const respuesta = await db.query('select id_login from login where username = ?;',[id]);
            if(respuesta.length >0){
                return res.status(200).json(respuesta[0]);
            }
            res.status(404).json({text: " El Usuario no exsiste " })
    }
 
    
    public async update (req:any, res:any): Promise <void>{
        if(req.Id_Rol == "1" || req.Id_Rol == "2"){
            const {id} = req.params;
            const respuesta = await db.query('update usuarios set ? where id_usuario = ?',[req.body, id]);
        
            if(respuesta.length >0) res.json({text: 'Usuario editado: ' + req.params.id});
            res.status(400).json({mensaje: "Error el modificar el usuario"});
            }
            else {
                res.status(401).json({mensaje: "Permisos insuficientes"});
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
        
    }
    
    public async consulta (req:any, res:any){
        const respuesta = await db.query('select id_usuario, nombre from usuarios  where email = ? and fir_name = ?',[req.body.email, req.body.fir_name]);
        if(respuesta.length >0){
            return res.json(respuesta[0]);
        }
        res.status(404).json({text: " El Usuario no exsiste " })
    }

    */
}


export const coreController = new CoreController();
export default coreController;