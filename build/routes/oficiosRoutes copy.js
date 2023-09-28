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
        this.router.get('/', oficiosController_1.oficiosController.list);
        this.router.get('/:id', oficiosController_1.oficiosController.verUno);
        this.router.post('/', oficiosController_1.oficiosController.create);
        this.router.put('/:id', oficiosController_1.oficiosController.update);
        this.router.delete('/:id', oficiosController_1.oficiosController.delete);
    }
}
const oficiosRoutes = new OficiosRoutes();
exports.default = oficiosRoutes.router;
