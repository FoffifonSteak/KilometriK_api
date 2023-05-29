"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fastify_decorators_1 = require("fastify-decorators");
const path_1 = require("path");
const server_1 = __importDefault(require("./server"));
class App {
    constructor() {
        this.instance = require('fastify')();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerControllers();
            (0, server_1.default)(this.instance);
            yield this.instance.listen(3000);
            console.log('Serveur démarré sur le port 3000');
        });
    }
    registerControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.instance.register(fastify_decorators_1.bootstrap, {
                // Specify directory with our controllers
                directory: (0, path_1.resolve)(__dirname, `controllers`),
                // Specify mask to match only our controllers
                mask: /\.controller\./,
            });
        });
    }
}
const app = new App();
app.start().catch((err) => {
    console.error('Erreur lors du démarrage du serveur :', err);
    process.exit(1);
});
