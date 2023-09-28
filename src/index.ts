import express, {Application} from "express";
import body_parser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes  from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import serviciosRoutes from './routes/serviciosRoutes';
import direccionesRoutes from './routes/direccionesRoutes';
import habilidadesRoutes from './routes/habilidadesRoutes';
import loginRoutes from './routes/loginRoutes';
import coreRoutes from './routes/coreRoutes';
import menuRoutes from './routes/menuRoutes'; 
class Server {

public app: Application;
    constructor(){
       this.app = express();
       this.config();
       this.routes();
    }

config(): void{

this.app.set('port', process.env.PORT || 3000 || '0.0.0.0');
this.app.use(morgan('dev'));
this.app.use(cors());
this.app.use(express.json());
this.app.use(body_parser.urlencoded({extended:true}));
this.app.use(express.urlencoded({extended: false}));
}
routes(): void{
this.app.use(indexRoutes);
this.app.use('/servicios/login',loginRoutes);
//this.app.use('/SBE/login',loginRoutes); 
this.app.use('/SBE/usuarios',usuariosRoutes);
this.app.use('/SBE/servicios',serviciosRoutes);
this.app.use('/SBE/direcciones',direccionesRoutes); 
this.app.use('/SBE/habilidades',habilidadesRoutes);
this.app.use('/SBE/core',coreRoutes);
this.app.use('/SBE/menu',menuRoutes);
}

start(): void{
    
    this.app.listen(this.app.get('port'), () => {
        console.log('Server on port: ', this.app.get('port'))
    });
}
}

const server = new Server();
server.start(); 