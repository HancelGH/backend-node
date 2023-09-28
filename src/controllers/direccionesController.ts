import {request, response } from 'express'
import db from '../database/database';

class DireccionesController{

    public async catalogo_dep (req: any, res:any){
        try {
            const respuesta = await db.query('call departamentos(?)',req.params.id);
            if(respuesta.length >0){
                return res.json(respuesta[0]);
                }
                res.status(404).json({text: "La dirección no exsiste " })
            
        } catch (error) {
            console.log(error);
        }
    }
    public async Consulta_general (req:any, res:any){
        try {
            const id = req.params.id;
            const respuesta = await db.query('select id_direccion, nombre_posicion, estado from direcciones where id_usuario = ?',id);
            if(respuesta.length >0){
            return res.json(respuesta);
            }
            res.status(404).json({text: "La dirección no exsiste " })
        } catch (error) {
            console.log(error);
        }
}
    public async consulta_usuario (req:any, res:any){
            try {
                const id = req.params.id;
                const respuesta = await db.query('select latitud, longitud, nombre_posicion from direcciones  where id_usuario = ?',id);
                if(respuesta.length >0){
                return res.json(respuesta[0]);
                }
                res.status(404).json({text: "La dirección no exsiste " })
            } catch (error) {
                console.log(error);
            }
    }

    public async create (req:Request, res:any): Promise <void> {
        try {
            await db.query('insert into direcciones  set ?',[req.body]);
            console.log(req.body);
            res.status(200).json({texto:"Exito"});
        } catch (error) {
            console.log(error);
        } 
    }
    public async update (req:any, res:any): Promise <void>{
        const {id} = req.params;
        await db.query('update direcciones set ? where id = ?',[req.body, id]);
        res.json({text: 'la direccion con el id a sido editada: ' + req.params.id}); 
    }
    public async delete (req:any, res:any){
        const {id} = req.params;
        await db.query('update direcciones set estado = false  where id_servicio = ?',id);
        res.json({text: 'la direccion: con id a'+ req.params.id+' Eliminado'}); 
    }

}

export const direccionesController = new DireccionesController();
export default direccionesController; 