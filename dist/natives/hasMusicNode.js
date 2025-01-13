"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$hasMusicNode",
    version: "1.0.0",
    description: "Check whether the current guild has a music node created.",
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        return this.success((0, discord_player_1.useMainPlayer)().nodes.has(ctx.guild));
    }
});
