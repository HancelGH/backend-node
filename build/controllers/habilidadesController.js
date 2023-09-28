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
exports.habilidadesController = void 0;
const database_1 = __importDefault(require("../database/database"));
class HabilidadesController {
    verUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('select id_servicio, id_usuario, descripcion  from habilidades where id_habilidades = ?', [id]);
                if (respuesta.length > 0) {
                    return res.json(respuesta[0]);
                }
                res.status(404).json({ text: " Error " });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('insert into habilidades  set ?', [req.body]);
                if (respuesta.length > 0) {
                    const usuario = req.body.id_usuario;
                    const servicio = req.body.id_servicio;
                    const desc = req.body.descripcion;
                    const id_hab = yield database_1.default.query('select id_habilidades from habilidades where id_usuario = ? and id_servicio = ? and descripcion = ?', [usuario, servicio, desc]);
                    return res.status(200).json(id_hab);
                }
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
                console.log(id);
                console.log(req.body);
                const respuesta = yield database_1.default.query('update habilidades set ? where id_habilidades = ?', [req.body, id]);
                console.log(respuesta);
                if (respuesta.length > 0) {
                    res.json({ text: 'la habilidades con el id a sido editada: ' + req.params.id });
                }
                else {
                    res.status(400).json({ mensaje: "Error" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('delete from habilidades where id_habilidades =  ?', id);
                if (respuesta.length > 0) {
                    console.log(respuesta);
                    res.status(200).json({ text: 'la habilidad: con id a sido ' + req.params.id + ' Eliminado' });
                }
                else {
                    res.status(400).json({ mensaje: "Error" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.habilidadesController = new HabilidadesController();
exports.default = exports.habilidadesController;
