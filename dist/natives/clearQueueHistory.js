"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$clearQueueHistory",
    version: "1.0.0",
    description: "Clear the queue history.",
    unwrap: false,
    execute(ctx) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        if (!queue) {
            return this.customError("No queue found.");
        }
        queue.history.clear();
        return this.success();
    }
});
