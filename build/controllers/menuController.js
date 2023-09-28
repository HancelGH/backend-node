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
exports.menuController = void 0;
const database_1 = __importDefault(require("../database/database"));
class MenuController {
    catalogo_menu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('select id, nombre, categoria, precio, ruta, imagen from menu where estado = 1');
                if (respuesta.length > 0) {
                    return res.json(respuesta[0]);
                }
                res.status(404).json({ text: "Menus no exsisten" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    Consulta_general(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const respuesta = yield database_1.default.query('select id_direccion, nombre_posicion, estado from direcciones where id_usuario = ?', id);
                if (respuesta.length > 0) {
                    return res.json(respuesta);
                }
                res.status(404).json({ text: "La dirección no exsiste " });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    consulta_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const respuesta = yield database_1.default.query('select latitud, longitud, nombre_posicion from direcciones  where id_usuario = ?', id);
                if (respuesta.length > 0) {
                    return res.json(respuesta[0]);
                }
                res.status(404).json({ text: "La dirección no exsiste " });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('insert into menu set ?', [req.body]);
                console.log(req.body);
                res.status(200).json({ texto: "Exito" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update menu set ? where id = ?', [req.body, id]);
            res.json({ text: 'el menu con el id a sido editado: ' + req.params.id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update menu set estado = 0 where id = ?', id);
            res.json({ text: 'el menu: con id ' + req.params.id + ' ha sido Eliminado' });
        });
    }
}
exports.menuController = new MenuController();
exports.default = exports.menuController;
