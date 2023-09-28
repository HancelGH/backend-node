import { TokenValidacion } from './../libs/verificartoken';
import { Router } from  'express';
import { usuariosController }from './../controllers/usuariosController';

class UsuariosRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config (): void{
        this.router.get('/',TokenValidacion, usuariosController.list);
        this.router.post('/generar_token', usuariosController.getOne);
        this.router.post('/', usuariosController.create);
        this.router.get('/consulta/:id',TokenValidacion,usuariosController.consultarUsuario);
        this.router.put('/:id',TokenValidacion, usuariosController.update);
        this.router.delete('/:id',TokenValidacion, usuariosController.delete);
        this.router.post('/referencias',TokenValidacion,usuariosController.create_rel);
        this.router.get('/referencias/:id',TokenValidacion,usuariosController.get_rel);
        this.router.get('/referencias/baja/:id', TokenValidacion,usuariosController.delete_rel);
    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;