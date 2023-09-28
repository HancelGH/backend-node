"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificartoken_1 = require("./../libs/verificartoken");
const express_1 = require("express");
const direccionesController_1 = require("../controllers/direccionesController");
class DireccionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/info/:id', verificartoken_1.TokenValidacion, direccionesController_1.direccionesController.catalogo_dep);
        this.router.get('/usuario/:id', verificartoken_1.TokenValidacion, direccionesController_1.direccionesController.Consulta_general);
        this.router.get('/:id', verificartoken_1.TokenValidacion, direccionesController_1.direccionesController.consulta_usuario);
        this.router.post('/', verificartoken_1.TokenValidacion, direccionesController_1.direccionesController.create);
        this.router.put('/:id', verificartoken_1.TokenValidacion, direccionesController_1.direccionesController.update);
        this.router.delete('/', verificartoken_1.TokenValidacion, direccionesController_1.direccionesController.delete);
    }
}
const direccionesRoutes = new DireccionesRoutes();
exports.default = direccionesRoutes.router;
