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
const database_1 = __importDefault(require("../database/database"));
class OficiosController {
    list(req, res) {
        database_1.default.query('describe roles');
        res.json('roles');
    }
    verUno(req, res) {
        res.json({ text: 'obteniendo el usuario: ' + req.params.id });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into oficios set ?', [req.body]);
            console.log(req.body);
            res.json('Oficio Creado');
        });
    }
    update(req, res) {
        res.json({ text: 'editando al cliente: ' + req.params.id });
    }
    delete(req, res) {
        res.json({ text: 'eliminando al cliente: ' + req.params.id });
    }
}
exports.oficiosController = new OficiosController();
exports.default = exports.oficiosController;
