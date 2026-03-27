"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: '$setVolume',
    version: '1.0.0',
    description: 'Set the volume of the music player.',
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredNumber('Amount', 'The volume amount to be applied.')],
    execute(ctx, [amount]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild.id);
        if (!queue)
            return this.customError('No queue found.');
        queue.node.setVolume(amount);
        return this.success();
    },
});
