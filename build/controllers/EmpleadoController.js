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
const database_1 = __importDefault(require("./../database/database"));
class EmpleadoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oficios = yield database_1.default.query('select * from usuario_empleado');
            res.json(oficios[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('select * from usuario_empleado where id_usuario = ?', [id]);
            if (respuesta.length > 0) {
                return res.json(respuesta[0]);
            }
            res.status(404).json({ text: " El oficio no exsiste " });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into usuario_empleado set ?', [req.body]);
            console.log(req.body);
            res.json('Ususario Creado');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update usuario_empleado set ? where id_usuario = ?', [req.body, id]);
            res.json({ text: 'editando al cliente: ' + req.params.id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update usuario_cliente set estado = 0 where id_usuario = ?', [id]);
            res.json({ text: ' cliente: ' + req.params.id + ' Eliminado' });
        });
    }
}
exports.empleadoController = new EmpleadoController();
exports.default = exports.empleadoController;
