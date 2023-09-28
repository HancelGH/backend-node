"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginController_1.loginController.list);
        this.router.post('/', loginController_1.loginController.login);
        this.router.post('/usuario', loginController_1.loginController.create_login);
        this.router.put('/:id', loginController_1.loginController.update);
        this.router.delete('/:id', loginController_1.loginController.delete);
        this.router.post('/gen_tok', loginController_1.loginController.dat);
        this.router.post('/consulta', loginController_1.loginController.dat);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
