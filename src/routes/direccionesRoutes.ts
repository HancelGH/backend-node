import { TokenValidacion } from './../libs/verificartoken';
import { Router, request } from  'express';
import { direccionesController }from '../controllers/direccionesController';

class DireccionesRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config (): void{
        this.router.get('/info/:id',TokenValidacion, direccionesController.catalogo_dep);
        this.router.get('/usuario/:id', TokenValidacion, direccionesController.Consulta_general);
        this.router.get('/:id', TokenValidacion, direccionesController.consulta_usuario);
        this.router.post('/', TokenValidacion, direccionesController.create);
        this.router.put('/:id', TokenValidacion, direccionesController.update);
        this.router.delete('/', TokenValidacion, direccionesController.delete);
    }
}
const direccionesRoutes = new DireccionesRoutes();
export default direccionesRoutes.router;