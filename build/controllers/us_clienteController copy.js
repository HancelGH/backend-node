"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./../database/database"));
class Us_clienteController {
    list(req, res) {
        database_1.default.query('describe roles');
        res.json('roles');
    }
    verUno(req, res) {
        res.json({ text: 'obteniendo el usuario: ' + req.params.id });
    }
    create(req, res) {
        console.log(req.body);
        res.json('creando un cliente');
    }
    update(req, res) {
        res.json({ text: 'editando al cliente: ' + req.params.id });
    }
    delete(req, res) {
        res.json({ text: 'eliminando al cliente: ' + req.params.id });
    }
}
exports.usclienteController = new Us_clienteController();
exports.default = exports.usclienteController;
