"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$clearQueue",
    version: "1.0.0",
    description: "Clear the guild queue.",
    unwrap: false,
    execute(ctx) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        queue.clear();
        return this.success();
    }
});
