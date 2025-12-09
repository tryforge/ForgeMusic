"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$queueHistoryLength",
    version: "1.0.0",
    description: "Returns the length of the tracks that were played.",
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    execute(ctx) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        if (!queue) {
            return this.customError("No queue found.");
        }
        return this.success(queue.history.tracks.data.length);
    }
});
