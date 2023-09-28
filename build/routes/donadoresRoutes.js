"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donadoresController_1 = require("../controllers/donadoresController");
class DonadoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', donadoresController_1.donadoresController.list);
        this.router.get('/activo', donadoresController_1.donadoresController.activo);
        this.router.post('/', donadoresController_1.donadoresController.create);
    }
}
const donadoresRoutes = new DonadoresRoutes();
exports.default = donadoresRoutes.router;
