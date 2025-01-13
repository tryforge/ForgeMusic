"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
const hasQueue_1 = __importDefault(require("../utils/hasQueue"));
exports.default = new forgescript_1.NativeFunction({
    name: "$leaveVoiceChannel",
    version: "1.0.0",
    description: "Destroys the current voice connection.",
    unwrap: false,
    async execute(ctx) {
        if ((0, hasQueue_1.default)(ctx)) {
            await (0, discord_player_1.useQueue)(ctx.guild).connection.destroy();
        }
        return this.success();
    }
});
