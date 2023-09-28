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
class DonadoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oficios = yield database_1.default.query('select * from usuarios_donantes');
            res.json(oficios[0]);
        });
    }
    activo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("Servicio Donante Activo");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into usuarios_donantes set ?', [req.body]);
            console.log(req.body);
            res.json('EXITO: recepcion donante');
        });
    }
}
exports.donadoresController = new DonadoresController();
exports.default = exports.donadoresController;
