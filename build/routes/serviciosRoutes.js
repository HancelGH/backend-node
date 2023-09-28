"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificartoken_1 = require("./../libs/verificartoken");
const express_1 = require("express");
const serviciosController_1 = require("../controllers/serviciosController");
class OficiosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        try {
            this.router.get('/', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.list);
            this.router.get('/:id', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.verUno);
            this.router.post('/', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.create);
            this.router.put('/:id', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.update);
            this.router.post('/delete', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.delete);
            this.router.post('/proveedor-no', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.lista_prov_no);
            this.router.post('/proveedor', verificartoken_1.TokenValidacion, serviciosController_1.serviciosController.lista_prov);
        }
        catch (error) {
            console.log(error);
        }
    }
}
const serviciosRoutes = new OficiosRoutes();
exports.default = serviciosRoutes.router;
