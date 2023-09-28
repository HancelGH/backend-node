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
class ServiciosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oficios = yield database_1.default.query('select * from servicios order by id_servicio desc');
            res.json(oficios[0]);
        });
    }
    verUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('select * from oficios where id_servicio = ?', [id]);
            if (respuesta.length > 0) {
                return res.json(respuesta[0]);
            }
            res.status(404).json({ text: " El oficio no exsiste " });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into servicios set ?', [req.body]);
            console.log(req.body);
            res.json('Oficio Creado');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update servicios set ? where id = ?', [req.body, id]);
            res.json({ text: 'editando al cliente: ' + req.params.id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('delete from servicios where id_servicio = ?', [id]);
            res.json({ text: ' Servicio: ' + req.params.id + ' Eliminado' });
        });
    }
}
exports.serviciosController = new ServiciosController();
exports.default = exports.serviciosController;
