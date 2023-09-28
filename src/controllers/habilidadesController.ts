import {request, response } from 'express'
import db from '../database/database';

class HabilidadesController{
    


    public async verUno(req:any, res:any){
        try {
        const {id} = req.params;
        const respuesta = await db.query('select id_servicio, id_usuario, descripcion  from habilidades where id_habilidades = ?',[id]);
        if(respuesta.length >0){
            return res.json(respuesta[0]);
        }
        res.status(404).json({text: " Error " })
       
        } catch (error) {
         console.log(error);   
        }
    }

    public async create (req:any, res:any): Promise <void> {
        try {
        const respuesta = await db.query('insert into habilidades  set ?',[req.body]);
        if(respuesta.length > 0 ){
            const usuario = req.body.id_usuario;
            const servicio = req.body.id_servicio;
            const desc = req.body.descripcion;
            const id_hab = await db.query('select id_habilidades from habilidades where id_usuario = ? and id_servicio = ? and descripcion = ?',[usuario, servicio, desc]);
            return res.status(200).json(id_hab); 
        }
        } catch (error) {
            console.log(error);
        }
    }
    public async update (req:any, res:any): Promise <void>{  
        try {
            const {id} = req.params;
            console.log(id);
            console.log(req.body);
        const respuesta = await db.query('update habilidades set ? where id_habilidades = ?',[req.body, id]);
        console.log(respuesta);
       if (respuesta.length >0 ){
           res.json({text: 'la habilidades con el id a sido editada: ' + req.params.id}); 
       }else{
           res.status(400).json({mensaje: "Error"});
       }
        } catch (error) {
            console.log(error);
        }
        
    }
    public async delete (req:any, res:any){
        try {
            const {id} = req.params;
       const respuesta = await db.query('delete from habilidades where id_habilidades =  ?',id);
        
       if (respuesta.length >0 ){
           console.log(respuesta);
           res.status(200).json({text: 'la habilidad: con id a sido '+ req.params.id+' Eliminado'}); 
           
       }else{
           res.status(400).json({mensaje: "Error"});
       }
        } catch (error) {
            console.log(error);
        }
        
    }
        
    
    

}

export const habilidadesController = new HabilidadesController();
export default habilidadesController; 