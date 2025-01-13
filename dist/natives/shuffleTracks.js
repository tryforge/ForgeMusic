"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$shuffleTracks",
    version: "1.0.0",
    description: "Shuffle the current guild queue.",
    unwrap: false,
    execute(ctx) {
        const player = (0, discord_player_1.useMainPlayer)();
        player.queues.get(ctx.guild).tracks.shuffle();
        return this.success();
    }
});
