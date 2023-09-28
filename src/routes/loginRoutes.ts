import { Router, request } from  'express';
import { loginController }from '../controllers/loginController';

class LoginRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }
    config (): void{
        this.router.get('/',loginController.list);
        this.router.post('/',loginController.login);
        this.router.post('/usuario',loginController.create_login);
        this.router.put('/:id',loginController.update);
        this.router.delete('/:id',loginController.delete)
        this.router.post('/gen_tok',loginController.dat);
        this.router.post('/consulta',loginController.dat);
    }
}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;