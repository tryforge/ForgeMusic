"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: '$seekTrack',
    version: '1.0.0',
    description: 'Seeks a track.',
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredTime('Duration', 'Seek duration to be applied.')],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [duration]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild.id);
        if (!queue)
            return this.customError('No queue found.');
        return this.success(await queue.node.seek(duration));
    },
});
