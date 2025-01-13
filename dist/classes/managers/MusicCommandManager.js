"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicCommandManager = exports.handlerName = void 0;
const forgescript_1 = require("@tryforge/forgescript");
/**
 * Common music handler name.
 */
exports.handlerName = "ForgeMusic";
/**
 * The music command manager.
 */
class MusicCommandManager extends forgescript_1.BaseCommandManager {
    handlerName = exports.handlerName;
}
exports.MusicCommandManager = MusicCommandManager;
