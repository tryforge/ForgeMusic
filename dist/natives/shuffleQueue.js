"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$shuffleQueue",
    version: "1.0.0",
    description: "Shuffle the queue when the current track ends, unlike $shuffleTracks that can be undone, this function does not mutates the queue.",
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        return this.success((0, discord_player_1.useQueue)(ctx.guild).enableShuffle(true));
    }
});
