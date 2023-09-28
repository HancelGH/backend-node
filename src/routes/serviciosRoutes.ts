import { TokenValidacion } from './../libs/verificartoken';
import { Router, request } from  'express';
import { serviciosController }from '../controllers/serviciosController';

class OficiosRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }
 
    config (): void{
        try {
        this.router.get('/', TokenValidacion, serviciosController.list);
        this.router.get('/:id',TokenValidacion, serviciosController.verUno);
        this.router.post('/',TokenValidacion , serviciosController.create);
        this.router.put('/:id',TokenValidacion, serviciosController.update);
        this.router.post('/delete',TokenValidacion, serviciosController.delete)
        this.router.post('/proveedor-no', TokenValidacion,serviciosController.lista_prov_no);
        this.router.post('/proveedor', TokenValidacion, serviciosController.lista_prov);   
        } catch (error) {
            console.log(error);
        }
    }
}
const serviciosRoutes = new OficiosRoutes();
export default serviciosRoutes.router;