"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificartoken_1 = require("./../libs/verificartoken");
const express_1 = require("express");
const habilidadesController_1 = require("../controllers/habilidadesController");
class HabilidadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', verificartoken_1.TokenValidacion, habilidadesController_1.habilidadesController.verUno);
        this.router.post('/', verificartoken_1.TokenValidacion, habilidadesController_1.habilidadesController.create);
        this.router.put('/:id', verificartoken_1.TokenValidacion, habilidadesController_1.habilidadesController.update);
        this.router.delete('/:id', verificartoken_1.TokenValidacion, habilidadesController_1.habilidadesController.delete);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
exports.default = habilidadesRoutes.router;
