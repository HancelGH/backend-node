"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const serviciosRoutes_1 = __importDefault(require("./routes/serviciosRoutes"));
const direccionesRoutes_1 = __importDefault(require("./routes/direccionesRoutes"));
const habilidadesRoutes_1 = __importDefault(require("./routes/habilidadesRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const coreRoutes_1 = __importDefault(require("./routes/coreRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000 || '0.0.0.0');
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/servicios/login', loginRoutes_1.default);
        //this.app.use('/SBE/login',loginRoutes); 
        this.app.use('/SBE/usuarios', usuariosRoutes_1.default);
        this.app.use('/SBE/servicios', serviciosRoutes_1.default);
        this.app.use('/SBE/direcciones', direccionesRoutes_1.default);
        this.app.use('/SBE/habilidades', habilidadesRoutes_1.default);
        this.app.use('/SBE/core', coreRoutes_1.default);
        this.app.use('/SBE/menu', menuRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
