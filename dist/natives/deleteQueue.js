"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteQueue",
    version: "1.0.0",
    description: "Deletes the queue of the current guild.",
    unwrap: false,
    output: forgescript_1.ArgType.Unknown,
    execute(ctx) {
        if ((0, discord_player_1.useQueue)(ctx.guild)) {
            (0, discord_player_1.useQueue)(ctx.guild).delete();
        }
        return this.success();
    }
});
