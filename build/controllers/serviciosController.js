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
exports.serviciosController = void 0;
const database_1 = __importDefault(require("../database/database"));
class ServiciosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oficios = yield database_1.default.query('select * from servicios order by id_servicio desc');
            if (oficios.length > 0) {
                res.status(200).json(oficios[0]);
            }
            else {
                res.status(401).json({ mensaje: "No hay Servicios disponibles" });
            }
        });
    }
    verUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('select * from servicios where id_servicio = ?', [id]);
                if (respuesta.length > 0) {
                    return res.json(respuesta[0]);
                }
                res.status(404).json({ text: " El oficio no exsiste " });
            }
            catch (error) {
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.Id_Rol == "1") {
                    let ingreso = {
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        url: req.body.url,
                        tipo: req.body.tipo
                    };
                    const resp = yield database_1.default.query('insert into servicios set ?', [ingreso]);
                    //console.log(req.body);
                    console.log(resp);
                    res.status(200).json('Oficio Creado con Exito');
                }
                else {
                    console.log('Permisos insuficientes');
                    res.status(401).json({ mensaje: "Permisos insuficientes" });
                }
            }
            catch (error) {
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('update servicios set ? where id_servicio = ?', [req.body, req.params.id]);
                res.json({ text: 'editando al cliente: ' + req.params.id });
            }
            catch (error) {
                res.status(400).json({ mensaje: "Error inesperado" + error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id_servicio;
                console.log(id);
                const resp = yield database_1.default.query('delete from servicios where id_servicio = ?', [id]);
                console.log(resp);
                res.json({ text: ' Servicio: ' + req.params.id + ' Eliminado' });
            }
            catch (error) {
                res.status(400).json({ mensaje: "Error al Eliminar" });
            }
        });
    }
    lista_prov_no(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usu = req.body.id;
                const oficios = yield database_1.default.query('call servicios_usuario_f(?)', [usu]);
                if (oficios.length > 0) {
                    res.status(200).json(oficios[0][0]);
                }
                else {
                    res.status(401).json({ mensaje: "No hay Servicios disponibles" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    lista_prov(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usu = req.body.id;
                const oficios = yield database_1.default.query('call servicios_usuario_t(?)', [usu]);
                if (oficios.length > 0) {
                    res.status(200).json(oficios[0][0]);
                }
                else {
                    res.status(401).json({ mensaje: "No hay Servicios disponibles" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.serviciosController = new ServiciosController();
exports.default = exports.serviciosController;
