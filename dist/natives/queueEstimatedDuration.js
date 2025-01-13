"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$queueEstimatedDuration",
    version: "1.0.0",
    description: "Returns the estimated duration of the current guild queue in milliseconds.",
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    execute(ctx) {
        return this.success((0, discord_player_1.useQueue)(ctx.guild).estimatedDuration);
    }
});
