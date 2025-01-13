"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getNode_1 = __importDefault(require("../utils/getNode"));
exports.default = new forgescript_1.NativeFunction({
    name: "$skipTo",
    version: "1.0.0",
    description: "Skip the current track to the given position.",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredNumber("Position", "The track position to be played.")],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [position]) {
        return this.success((0, getNode_1.default)(ctx).skipTo(position));
    }
});
