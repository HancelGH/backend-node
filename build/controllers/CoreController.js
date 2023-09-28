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
exports.coreController = void 0;
const database_1 = __importDefault(require("../database/database"));
class CoreController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lat = req.body.lat;
                const lng = req.body.lng;
                const dist = req.body.dist;
                const id_servicio = req.body.id_servicio;
                let consulta = "call call_servicio(" + lat + ", " + lng + " ," + dist + " ," + id_servicio + ")";
                console.log(consulta);
                const respuesta = yield database_1.default.query(consulta);
                //console.log (respuesta);
                if (respuesta[0][0].length > 0) {
                    res.status(200).json(respuesta[0][0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    core_list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lat = req.body.lat;
                const lng = req.body.lng;
                const dist = req.body.dist;
                const id_servicio = req.body.id_servicio;
                let consulta = "call call_servicio(" + lat + ", " + lng + " ," + dist + " ," + id_servicio + ")";
                console.log(consulta);
                const respuesta = yield database_1.default.query(consulta);
                //console.log (respuesta);
                if (respuesta[0][0].length > 0) {
                    res.status(200).json(respuesta[0][0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ mensaje: "error" });
            }
        });
    }
    trabajos_externos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_usuario_ = req.params.id;
                console.log(id_usuario_);
                const respuesta = yield database_1.default.query('call trabajos_externos(?)', [id_usuario_]);
                console.log(respuesta[0][0]);
                if (respuesta[0].length > 0) {
                    res.status(200).json(respuesta[0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
                console.log("Solucionado");
                res.status(400).json({ mensaje: "error" });
            }
        });
    }
    trabajo_general(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_usuario_ = req.body.id_usuario;
                const id_servicio = req.body.id_servicio;
                console.log(id_usuario_);
                const respuesta = yield database_1.default.query('call trabajos_general(?,?)', [id_usuario_, id_servicio]);
                console.log(respuesta[0][0]);
                if (respuesta[0].length > 0) {
                    res.status(200).json(respuesta[0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
                console.log("Solucionado");
                res.status(400).json({ mensaje: "error" });
            }
        });
    }
    trabajos_externos_servicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_usuario_ = req.params.id;
                const id_servicio_ = req.params.id_servicio;
                console.log(id_usuario_);
                const respuesta = yield database_1.default.query('call trabajos_externos_servicio(?, ?)', [id_usuario_, id_servicio_]);
                console.log(respuesta[0][0]);
                if (respuesta[0].length > 0) {
                    res.status(200).json(respuesta[0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    crear_trabajos_externos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const rr = yield database_1.default.query('insert into experiencia set ?', [req.body]);
                const id_hab = req.body.id_habilidad;
                const desc = req.body.descripcion;
                const respuesta1 = yield database_1.default.query('select id_experiencia from experiencia where id_habilidad = ? and descripcion = ?', [id_hab, desc]);
                console.log("prueba de inserecion 2");
                console.log(respuesta1);
                if (respuesta1.length > 0) {
                    res.status(200).json(respuesta1[0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    crear_trabajos_externos_dat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('insert into trabajos_externos set ?', [req.body]);
                console.log(respuesta[0]);
                if (respuesta.length > 0) {
                    res.status(200).json(respuesta[0]);
                }
                else {
                    res.status(400).json({ mensaje: "error" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create_itrab(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call crear_trabajo(?,?,?,?,?,?,?,?,?,?)', [req.body.id_hab, req.body.descripcion, req.body.descripcion_ex,
                    req.body.id_usuario_cli, req.body.estado_solicitud,
                    req.body.estado_general, req.body.domicilio_cl, req.body.domicilio_pr,
                    req.body.id_usuario_pr, req.body.estado_servicio]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json(rr[0]);
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    status_create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call aceptar_rechazar_trabajo(?,?)', [req.body.id_trab, req.body.estado_general]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json("EXITO");
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    status_rech(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call status_rech(?)', [req.body.id_trab]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json("EXITO");
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update_trab(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call actualizar_trabajo(?,?)', [req.body.id_trab, req.body.porcentaje]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json(rr[0]);
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    consulta_trabajos_pr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call trabajos_iniciados(?)', [req.params.id]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json(rr[0]);
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    consulta_trabajos_cl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call trabajos_iniciados_cl(?)', [req.params.id]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json(rr[0]);
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    finalizar_trab_cl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call finalizar_trabajo_cl(?,?,?,?)', [req.body.id_trab, req.body.precio, req.body.comentario_ex, req.body.valoracion]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json(rr[0]);
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    finalizar_trab_pr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rr = yield database_1.default.query('call finalizar_trabajo_pr(?,?)', [req.body.id_trab, req.body.valoracion]);
                //console.log(req.body);
                if (rr.length > 0)
                    res.status(200).json(rr[0]);
                res.status(400).json({ mensaje: "Error el crear trabajo" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.coreController = new CoreController();
exports.default = exports.coreController;
