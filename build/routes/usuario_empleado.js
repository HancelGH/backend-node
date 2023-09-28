"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmpleadoController_1 = require("./../controllers/EmpleadoController");
const express_1 = require("express");
class UempRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', EmpleadoController_1.empleadoController.list);
        this.router.get('/:id', EmpleadoController_1.empleadoController.getOne);
        this.router.post('/', EmpleadoController_1.empleadoController.create);
        this.router.put('/:id', EmpleadoController_1.empleadoController.update);
        this.router.delete('/:id', EmpleadoController_1.empleadoController.delete);
    }
}
const empleadoRoutes = new UempRoutes();
exports.default = empleadoRoutes.router;
