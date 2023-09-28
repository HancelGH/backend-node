"use strict";
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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database/database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../config/config"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.Id_Rol == "1") {
                const usuarios = yield database_1.default.query('select * from usuarios where estado = 1');
                res.status(200).json(usuarios[0]);
            }
            else {
                res.status(401).json({ mensaje: "Permisos insuficientes" });
            }
        });
    }
    consultarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('select fir_name, hab_trabajar, estado_servicio, estado_actual from usuarios where estado = true and id_login = ?', [id]);
            if (respuesta[0].length > 0) {
                return res.status(200).json(respuesta[0]);
            }
            res.status(404).json({ text: " El Usuario no esta registrado" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const g_res = yield database_1.default.query('select nombre, foto,telefono, email, id_usuario, fecha_nacimiento, estado_servicio from usuarios where id_login = ? ', [req.body.id_login]);
                if (g_res[0].length > 0) {
                    console.log(g_res[0][0]);
                    const token = jsonwebtoken_1.default.sign({ dato: g_res[0][0] }, config_1.default.jwsSecret);
                    res.status(200).json(token);
                }
                res.status(200).json([{ valor: "0" }]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('insert into usuarios set ?', [req.body]);
                //console.log(req.body);
                const id_login = req.body.id_login;
                const telefono = req.body.telefono;
                const hab_trabajar = req.body.hab_trabajar;
                if (respuesta.length > 0) {
                    const g_res = yield database_1.default.query('select nombre, foto,telefono, email, id_usuario, fecha_nacimiento, estado_servicio from usuarios where id_login = ? and telefono = ?', [id_login, telefono]);
                    yield database_1.default.query('update usuarios set id_cli_usuario = ? where id_usuario = ?', [g_res[0][0].id_usuario, g_res[0][0].id_usuario]);
                    console.log(g_res[0][0]);
                    if (hab_trabajar == 1) {
                        console.log("Habilitado para trabajar");
                        yield database_1.default.query('update usuarios set estado_actual = true where id_login = ?', [id_login]);
                    }
                    const token = jsonwebtoken_1.default.sign({ dato: g_res[0][0] }, config_1.default.jwsSecret);
                    res.status(200).json(token);
                }
                res.status(400).json({ mensaje: "Error el insertar el usuario" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hab_trabajar = req.body.hab_trabajar;
                const respuesta = yield database_1.default.query('update usuarios set ? where id_usuario = ?', [req.body, id]);
                if (respuesta.length > 0) {
                    const g_res = yield database_1.default.query('select nombre, foto,telefono, email, id_usuario, fecha_nacimiento, estado_servicio from usuarios where id_login = ? and telefono = ?', [id, req.body.telefono]);
                    yield database_1.default.query('update usuarios set id_cli_usuario = ? where id_login = ?', [g_res[0][0].id_usuario, g_res[0][0].id_usuario]);
                    if (hab_trabajar == 1) {
                        console.log("Habilitado para trabajar");
                        yield database_1.default.query('update usuarios set estado_actual = true where id_login = ?', [id]);
                    }
                    const token = jsonwebtoken_1.default.sign({ dato: g_res[0][0] }, config_1.default.jwsSecret);
                    res.status(200).json(token);
                }
                res.status(400).json({ mensaje: "Error el modificar el usuario" });
            }
            catch (error) {
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.Id_Rol == "1" || req.Id_Rol == "2") {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('update usuarios set estado = 0 where id_usuario = ?', [id]);
                if (respuesta.length > 0)
                    res.json({ text: ' cliente: ' + req.params.id + ' Eliminado' });
                res.status(400).json({ mensaje: "Error el Eliminar usuario" });
            }
            else {
                res.status(401).json({ mensaje: "Permisos insuficientes" });
            }
        });
    }
    create_rel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('insert into referencias_personales set ?', [req.body]);
                const g_res = yield database_1.default.query('select * from referencias_personales where id_usuario = ? ', [req.body.id_usuario]);
                console.log(g_res[0]);
                if (g_res.length > 0) {
                    res.status(200).json(g_res);
                }
                res.status(400).json({ mensaje: "Error el insertar el referencia" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update_rel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.Id_Rol == "1" || req.Id_Rol == "2") {
                    const { id } = req.params;
                    const respuesta = yield database_1.default.query('update usuarios set ? where id_usuario = ?', [req.body, id]);
                    if (respuesta.length > 0)
                        res.json({ text: 'Usuario editado: ' + req.params.id });
                    res.status(400).json({ mensaje: "Error el modificar el usuario" });
                }
                else {
                    res.status(401).json({ mensaje: "Permisos insuficientes" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete_rel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('delete from usuarios where id_referencia = ?', [id]);
                if (respuesta.length > 0)
                    res.json({ text: ' cliente: ' + req.params.id + ' Eliminado' });
                res.status(400).json({ mensaje: "Error el Eliminar usuario" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    get_rel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('select * from referencias_personales where id_usuario = ?', req.params.id);
                console.log(respuesta[0]);
                if (respuesta.length > 0) {
                    res.json(respuesta);
                }
                else {
                    res.status(400).json({ mensaje: "Error datos vacios" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.usuariosController = new UsuariosController();
exports.default = exports.usuariosController;
