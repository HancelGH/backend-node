"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const config_1 = __importDefault(require("./../config/config"));
const bcrypt = __importStar(require("bcryptjs"));
const database_1 = __importDefault(require("../database/database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('peticion de lista');
            const respuesta = yield database_1.default.query('select nombre, contraseña, (select nombre from empresas where id = empresa_id) as empresa,' +
                '(select nombre from roles where id = rol_id) as rol  from usuarios');
            res.json(respuesta[0]);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Login: ');
                //segmento de lectura de datos
                let usuario_adm = [{
                        hab_trabajar: 0,
                        fir_name: 'Admin'
                    }];
                let usuario = req.body.usuario;
                console.log('usuario: ' + usuario);
                let pass = req.body.pass;
                console.log('pass ' + pass);
                const passBd = yield database_1.default.query('select pass from usuarios where nombre = ?', [usuario]);
                console.log(passBd[0][0].pass);
                if (pass == passBd[0][0].pass) {
                    res.status(200).json({ "estado": "Usuario valido", token: "fasdfasdfasdfasdfasdfasdfadfasdf" });
                }
                else {
                    res.status(401).json({ "estado": "El usuario y/o login no exsiste" });
                }
                //consulta a Base de datos
                /*const password = await db.query('select pass from usuarios where username = ?', [req.body.username]);
                console.log(password);
                
                if(password[0].length > 0){
                   console.log(password[0][0].pass);
                   const comparar = password[0][0].pass;
                   let varrrr = await bcrypt.encodeBase64(pass,2);
                   console.log(varrrr);
                   const estado = await bcrypt.compare(pass,comparar);*/
                /*let estados = false;
                console.log(pass + ' = ' + password[0][0].pass)
                if (password[0][0].pass == pass) {
                 console.log('true estados');
                 estados= true;
                } else {
                 console.log('veeerdadero');
                  estados = false;
                };*/
                /*console.log(estado);
                 if (estado){
                     console.log('estado verdadero')
                     const campos = await db.query('select id_login,id_rol from login where username = ?', [username]);
                     console.log('Realiza la consulta a la tabla de login')
                     const id_rol = campos[0][0].id_rol;
                     const id_login = campos[0][0].id_login;
                     
                     console.log(id_rol);
                         if(id_rol == 1){
                             const token: string = jwt.sign({username_: username, id_rol_: id_rol, id_login: id_login, usuario: usuario_adm} , config.jwsSecret,{
                                 expiresIn: 60*60*12
                             });
                             res.status(200).json(token)
                         } else{
                             // consulta para obtener datos y saber si es empleado y sus estados.
                             console.log(campos[0][0].id_login)
                             const usuario_ = await db.query('select fir_name, hab_trabajar, estado_actual,id_usuario from usuarios where estado = 1 and id_login = ?', [campos[0][0].id_login]);
                             console.log(usuario_[0][0]);
                             const token: string = jwt.sign({ username_: username, usuario: usuario_[0],id_rol_: id_rol,id_login: id_login } , config.jwsSecret,{
                                 expiresIn: 60*60*24
                             });
                             res.status(200).json(token)
                         }
                 }
             }else{
                 res.status(401).json({text: "El usuario y/o login no exsiste" });
             } */
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // segmento para insertar un nuevo usuario
            let username_ = req.body.username;
            let pass_ = req.body.pass;
            let rol_ = req.body.id_rol;
            if (rol_ != 1) {
                rol_ = 2;
            }
            pass_ = bcrypt.hashSync(pass_, 8);
            var user = ({
                username: username_,
                pass: pass_,
                id_rol: rol_
            });
            console.log("Inciando insercion");
            const inser = yield database_1.default.query('insert into login set ? ', [user]);
            const respuesta = yield database_1.default.query('select id_login from login where username = ?', [user.username]);
            console.log(respuesta[0][0].id_login);
            //segmento para crear el token
            const token = jsonwebtoken_1.default.sign({ id_login: respuesta[0][0].id_login, username_: user.username, id_rol_: user.id_rol }, config_1.default.jwsSecret);
            if (inser.length > 0) {
                res.status(200).json(token);
            }
            else {
                res.status(403).send({ message: 'error al crear login' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update login set ? where id = ?', [req.body, id]);
            res.json({ text: 'editando login: ' + req.params.id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update login set estado = 0 where id_login = ?', [id]);
            res.json({ text: ' Login: ' + req.params.id + ' Eliminado' });
        });
    }
    dat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_login = req.body.id_login;
                const resp = yield database_1.default.query('select id_rol, username from login where id_login = ?', [id_login]);
                const username = resp[0][0].username;
                const id_rol = resp[0][0].id_rol;
                const usuario_ = yield database_1.default.query('select fir_name, hab_trabajar, estado_actual,id_usuario from usuarios where estado = 1 and id_login = ?', [id_login]);
                console.log(usuario_[0][0]);
                const token = jsonwebtoken_1.default.sign({ username_: username, usuario: usuario_[0], id_rol_: id_rol, id_login: id_login }, config_1.default.jwsSecret, {
                    expiresIn: 60 * 60 * 24
                });
                res.status(200).json(token);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.loginController = new LoginController();
exports.default = exports.loginController;
