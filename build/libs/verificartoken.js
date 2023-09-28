"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidacion = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../config/config"));
const TokenValidacion = (req, res, Next) => {
    const token = req.headers['access-token'];
    console.log(req.body);
    if (!token)
        return res.status(401).json({ mensaje: "Acceso denegado" });
    console.log(token);
    const payload = jsonwebtoken_1.default.verify(token.toString(), config_1.default.jwsSecret);
    req.Id_Rol = payload.id_rol_;
    Next();
};
exports.TokenValidacion = TokenValidacion;
