import { coreController } from './../controllers/CoreController';
import { TokenValidacion } from './../libs/verificartoken';
import { Router } from  'express';

class CoreRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config (): void{
        this.router.post('/lista',TokenValidacion, coreController.list);
        this.router.get('/trabajos_externos/:id',TokenValidacion, coreController.trabajos_externos);
        this.router.get('/trabajos_externos/:id/:id_servicio',TokenValidacion, coreController.trabajos_externos_servicio);
        this.router.post('/trabajos_externos/crear',TokenValidacion, coreController.crear_trabajos_externos);
        this.router.post('/trabajos_externos/crear/dat', TokenValidacion,coreController.crear_trabajos_externos_dat);
        this.router.post('/lista/servicio',TokenValidacion, coreController.core_list);
        this.router.post('/lista/trabajos',TokenValidacion, coreController.trabajo_general);
        this.router.post('/iniciotrabajo', TokenValidacion, coreController.create_itrab);
        this.router.get('/proveedor/trabajos/:id', TokenValidacion, coreController.consulta_trabajos_pr);
        this.router.post('/estado/trabajo', TokenValidacion, coreController.status_create);
        this.router.post('/update/trabajo', TokenValidacion, coreController.update_trab);
        this.router.get('/usuario/trabajos/:id', TokenValidacion, coreController.consulta_trabajos_cl);
        this.router.post('/fintrabajocl',TokenValidacion, coreController.finalizar_trab_cl);
        this.router.post('/fintrabajopr',TokenValidacion, coreController.finalizar_trab_pr);
        this.router.post('/statusre',TokenValidacion, coreController.status_rech);
    }
}
const coreRoutes = new CoreRoutes();
export default coreRoutes.router;