"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controllers/menuController");
class DireccionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/catalogo', menuController_1.menuController.catalogo_menu);
        this.router.post('/crear', menuController_1.menuController.create);
        this.router.put('/actualizar/:id', menuController_1.menuController.update);
        this.router.delete('/eliminar/:id', menuController_1.menuController.delete);
        //this.router.get('/info/:id',TokenValidacion, direccionesController.catalogo_dep);
        //this.router.get('/usuario/:id', TokenValidacion, direccionesController.Consulta_general);
        //this.router.get('/:id', TokenValidacion, direccionesController.consulta_usuario);
        //this.router.post('/', TokenValidacion, direccionesController.create);
        //this.router.put('/:id', TokenValidacion, direccionesController.update);
        //this.router.delete('/', TokenValidacion, direccionesController.delete);
    }
}
const direccionesRoutes = new DireccionesRoutes();
exports.default = direccionesRoutes.router;
