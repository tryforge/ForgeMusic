"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: '$isPaused',
    version: '1.0.0',
    description: 'Check whether the music player is paused.',
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild.id);
        if (!queue)
            return this.customError('No queue found.');
        return this.success(queue.node.isPaused());
    },
});
