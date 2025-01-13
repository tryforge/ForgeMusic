"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$isPlaying",
    version: "1.0.0",
    description: "Check whether the music player is playing a track.",
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        const player = (0, discord_player_1.useMainPlayer)();
        return this.success(player.queues.get(ctx.guild).isPlaying());
    }
});
