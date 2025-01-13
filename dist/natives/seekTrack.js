"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getNode_1 = __importDefault(require("../utils/getNode"));
exports.default = new forgescript_1.NativeFunction({
    name: "$seekTrack",
    version: "1.0.0",
    description: "Seeks a track.",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredTime("Duration", "Seek duration to be applied.")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [duration]) {
        return this.success(await (0, getNode_1.default)(ctx).seek(duration));
    }
});
