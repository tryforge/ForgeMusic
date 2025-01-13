"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$isQueueHistoryEmpty",
    version: "1.0.0",
    description: "Returns whether the queue history is empty.",
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        return this.success((0, discord_player_1.useQueue)(ctx.guild).history.isEmpty());
    }
});
