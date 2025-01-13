"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getNode_1 = __importDefault(require("../utils/getNode"));
exports.default = new forgescript_1.NativeFunction({
    name: "$stopTrack",
    version: "1.0.0",
    description: "Forces to stop the current track.",
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        return this.success((0, getNode_1.default)(ctx).stop(true));
    }
});
