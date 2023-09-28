"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oficiosController_1 = require("../controllers/oficiosController");
class OficiosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', oficiosController_1.serviciosController.list);
        this.router.get('/:id', oficiosController_1.serviciosController.verUno);
        this.router.post('/', oficiosController_1.serviciosController.create);
        this.router.put('/:id', oficiosController_1.serviciosController.update);
        this.router.delete('/:id', oficiosController_1.serviciosController.delete);
    }
}
const serviciosRoutes = new OficiosRoutes();
exports.default = serviciosRoutes.router;
