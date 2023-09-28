"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificartoken_1 = require("./../libs/verificartoken");
const express_1 = require("express");
const usuariosController_1 = require("./../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.list);
        this.router.post('/generar_token', usuariosController_1.usuariosController.getOne);
        this.router.post('/', usuariosController_1.usuariosController.create);
        this.router.get('/consulta/:id', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.consultarUsuario);
        this.router.put('/:id', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.update);
        this.router.delete('/:id', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.delete);
        this.router.post('/referencias', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.create_rel);
        this.router.get('/referencias/:id', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.get_rel);
        this.router.get('/referencias/baja/:id', verificartoken_1.TokenValidacion, usuariosController_1.usuariosController.delete_rel);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
