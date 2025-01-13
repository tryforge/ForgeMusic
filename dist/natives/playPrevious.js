"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$playPrevious",
    version: "1.0.0",
    description: "Play the previous track in the queue history, if any.",
    unwrap: false,
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx) {
        await (0, discord_player_1.useQueue)(ctx.guild).history.previous();
        return this.success();
    }
});
