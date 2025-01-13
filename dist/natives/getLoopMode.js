"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getLoopMode",
    version: "1.0.0",
    description: "Returns the state of the loop mode.",
    unwrap: false,
    output: discord_player_1.QueueRepeatMode,
    execute(ctx) {
        const player = (0, discord_player_1.useMainPlayer)();
        return this.success(Object.keys(discord_player_1.QueueRepeatMode)[player.queues.get(ctx.guild).repeatMode]);
    }
});
