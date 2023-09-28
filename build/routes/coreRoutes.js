"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("./../controllers/CoreController");
const verificartoken_1 = require("./../libs/verificartoken");
const express_1 = require("express");
class CoreRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/lista', verificartoken_1.TokenValidacion, CoreController_1.coreController.list);
        this.router.get('/trabajos_externos/:id', verificartoken_1.TokenValidacion, CoreController_1.coreController.trabajos_externos);
        this.router.get('/trabajos_externos/:id/:id_servicio', verificartoken_1.TokenValidacion, CoreController_1.coreController.trabajos_externos_servicio);
        this.router.post('/trabajos_externos/crear', verificartoken_1.TokenValidacion, CoreController_1.coreController.crear_trabajos_externos);
        this.router.post('/trabajos_externos/crear/dat', verificartoken_1.TokenValidacion, CoreController_1.coreController.crear_trabajos_externos_dat);
        this.router.post('/lista/servicio', verificartoken_1.TokenValidacion, CoreController_1.coreController.core_list);
        this.router.post('/lista/trabajos', verificartoken_1.TokenValidacion, CoreController_1.coreController.trabajo_general);
        this.router.post('/iniciotrabajo', verificartoken_1.TokenValidacion, CoreController_1.coreController.create_itrab);
        this.router.get('/proveedor/trabajos/:id', verificartoken_1.TokenValidacion, CoreController_1.coreController.consulta_trabajos_pr);
        this.router.post('/estado/trabajo', verificartoken_1.TokenValidacion, CoreController_1.coreController.status_create);
        this.router.post('/update/trabajo', verificartoken_1.TokenValidacion, CoreController_1.coreController.update_trab);
        this.router.get('/usuario/trabajos/:id', verificartoken_1.TokenValidacion, CoreController_1.coreController.consulta_trabajos_cl);
        this.router.post('/fintrabajocl', verificartoken_1.TokenValidacion, CoreController_1.coreController.finalizar_trab_cl);
        this.router.post('/fintrabajopr', verificartoken_1.TokenValidacion, CoreController_1.coreController.finalizar_trab_pr);
        this.router.post('/statusre', verificartoken_1.TokenValidacion, CoreController_1.coreController.status_rech);
    }
}
const coreRoutes = new CoreRoutes();
exports.default = coreRoutes.router;
