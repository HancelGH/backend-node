import {Request, Response } from 'express'
import db from '../database/database';
class ServiciosController{
    
    public async list (req: Request, res: Response){
            const oficios = await  db.query('select * from servicios order by id_servicio desc');
            if(oficios.length >0){
                res.status(200).json(oficios[0]);
            } else{
                res.status(401).json({mensaje: "No hay Servicios disponibles"});
            }

    }

    public async verUno(req:Request, res:any){
        try {
        const {id} = req.params;
        const respuesta = await db.query('select * from servicios where id_servicio = ?',[id]);
        if(respuesta.length >0){
            return res.json(respuesta[0]);
        }
        res.status(404).json({text: " El oficio no exsiste " })
       
        } catch (error) {
            
        }}

    public async create (req:Request, res:any): Promise <void> {
        try {
            if(req.Id_Rol == "1"){
                let ingreso:any = {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    url: req.body.url,
                    tipo: req.body.tipo
                }
                
               const resp = await db.query('insert into servicios set ?',[ingreso]);
                //console.log(req.body);
                console.log(resp);
                res.status(200).json('Oficio Creado con Exito');
            }
            else {
                console.log('Permisos insuficientes');
                res.status(401).json({mensaje: "Permisos insuficientes"});
            }
             
        } catch (error) {
            
        }
    }
    public async update (req:Request, res:Response): Promise <void>{
        try {
            await db.query('update servicios set ? where id_servicio = ?',[req.body, req.params.id]);
            res.json({text: 'editando al cliente: ' + req.params.id});
            
        } catch (error) {
            res.status(400).json({mensaje: "Error inesperado"+ error});            
        }
            
    }

    public async delete (req:any, res:any){
        try {
        const id = req.body.id_servicio;
        console.log(id);
        const resp = await db.query('delete from servicios where id_servicio = ?',[id]);
        console.log(resp);
        res.json({text: ' Servicio: '+ req.params.id+' Eliminado'}); 
        } catch (error) {
            res.status(400).json({mensaje: "Error al Eliminar"})
        }
    }

    public async lista_prov_no (req: Request, res: Response){
        try {
            const usu = req.body.id;
            const oficios = await  db.query('call servicios_usuario_f(?)',[usu]);
            if(oficios.length >0){
            res.status(200).json(oficios[0][0]);
        } else{
            res.status(401).json({mensaje: "No hay Servicios disponibles"});
        }
        } catch (error) {
         console.log(error)   
        }

}
    public async lista_prov (req: Request, res: Response){
    try {
        const usu = req.body.id;
        const oficios = await  db.query('call servicios_usuario_t(?)',[usu]);
        if(oficios.length >0){
        res.status(200).json(oficios[0][0]);
    } else{
        res.status(401).json({mensaje: "No hay Servicios disponibles"});
    }
    } catch (error) {
     console.log(error)   
    }

}

}

export const serviciosController = new ServiciosController();
export default serviciosController;