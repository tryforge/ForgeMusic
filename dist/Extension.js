"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const path_1 = __importDefault(require("path"));
const SymbolGet = Symbol("ForgeMusic");
class Extension extends forgescript_1.ForgeExtension {
    name = "Forge.Music";
    description = "";
    version = "v1.0.0";
    init(client) {
        client[SymbolGet] = this;
        forgescript_1.FunctionManager.load(this.name, path_1.default.join(__dirname, "./functions"));
    }
    static getInstance(client) {
        return client[SymbolGet] || null;
    }
    [Symbol.for("nodejs.inspect.custom")]() {
        return "class Forge.Music { [native code] }";
    }
}
exports.Extension = Extension;
