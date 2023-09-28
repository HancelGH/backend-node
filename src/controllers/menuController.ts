import {request, response } from 'express'
import db from '../database/database';

class MenuController{

    public async catalogo_menu (req: any, res:any){
        try {
            const respuesta = await db.query('select id, nombre, categoria, precio, ruta, imagen from menu where estado = 1');
            if(respuesta.length >0){
                return res.json(respuesta[0]);
                }
                res.status(404).json({text: "Menus no exsisten" })
            
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
            await db.query('insert into menu set ?',[req.body]);
            console.log(req.body);
            res.status(200).json({texto:"Exito"});
        } catch (error) {
            console.log(error);
        } 
    }
    public async update (req:any, res:any): Promise <void>{
        const {id} = req.params;
        await db.query('update menu set ? where id = ?',[req.body, id]);
        res.json({text: 'el menu con el id a sido editado: ' + req.params.id}); 
    }
    public async delete (req:any, res:any){
        const {id} = req.params;
        await db.query('update menu set estado = 0 where id = ?',id);
        res.json({text: 'el menu: con id '+ req.params.id+' ha sido Eliminado'}); 
    }

}

export const menuController = new MenuController();
export default menuController; 