import { TokenValidacion } from './../libs/verificartoken';
import { Router, request } from  'express';
import { habilidadesController }from '../controllers/habilidadesController';

class HabilidadesRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config (): void{
        this.router.get('/:id', TokenValidacion, habilidadesController.verUno);
        this.router.post('/', TokenValidacion, habilidadesController.create);
        this.router.put('/:id', TokenValidacion, habilidadesController.update);
        this.router.delete('/:id', TokenValidacion, habilidadesController.delete);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
export default habilidadesRoutes.router;