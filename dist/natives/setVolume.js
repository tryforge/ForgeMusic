"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getNode_1 = __importDefault(require("../utils/getNode"));
exports.default = new forgescript_1.NativeFunction({
    name: "$setVolume",
    version: "1.0.0",
    description: "Set the volume of the music player.",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredNumber("Amount", "The volume amount to be applied.")],
    execute(ctx, [amount]) {
        (0, getNode_1.default)(ctx).setVolume(amount);
        return this.success();
    }
});
