"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const us_clienteController_1 = require("./../controllers/us_clienteController");
class UclienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', us_clienteController_1.usclienteController.list);
        this.router.get('/:id', us_clienteController_1.usclienteController.verUno);
        this.router.post('/', us_clienteController_1.usclienteController.create);
        this.router.put('/:id', us_clienteController_1.usclienteController.update);
        this.router.delete('/:id', us_clienteController_1.usclienteController.delete);
    }
}
const uclienteRoutes = new UclienteRoutes();
exports.default = uclienteRoutes.router;
