"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerElapsedTime',
    version: '1.0.0',
    description: 'Returns the elapsed time of the current song in milliseconds.',
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    execute(ctx) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild.id);
        if (!queue)
            return this.customError('No queue found.');
        return this.success(queue.node.getTimestamp().progress * 1000);
    },
});
