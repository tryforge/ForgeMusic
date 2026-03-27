"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: '$removeTrack',
    version: '1.0.0',
    description: 'Removes the track that is located at the given position.',
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredNumber('Position', 'The track position to be removed.')],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [position]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild.id);
        if (!queue)
            return this.customError('No queue found.');
        return this.success(!!queue.node.remove(position));
    },
});
