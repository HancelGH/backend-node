import { TokenValidacion } from './../libs/verificartoken';
import { Router, request } from  'express';
import { menuController }from '../controllers/menuController';

class DireccionesRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config (): void{
        this.router.get('/catalogo',menuController.catalogo_menu);
        this.router.post('/crear',menuController.create);
        this.router.put('/actualizar/:id', menuController.update);
        this.router.delete('/eliminar/:id', menuController.delete);
        //this.router.get('/info/:id',TokenValidacion, direccionesController.catalogo_dep);
        //this.router.get('/usuario/:id', TokenValidacion, direccionesController.Consulta_general);
        //this.router.get('/:id', TokenValidacion, direccionesController.consulta_usuario);
        //this.router.post('/', TokenValidacion, direccionesController.create);
        //this.router.put('/:id', TokenValidacion, direccionesController.update);
        //this.router.delete('/', TokenValidacion, direccionesController.delete);
    }
}
const direccionesRoutes = new DireccionesRoutes();
export default direccionesRoutes.router;