"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$setLoopMode",
    version: "1.0.0",
    description: "Set the loop mode of the music player.",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredString("Mode", "The loop mode of the music player.")],
    execute(ctx, [mode]) {
        const player = (0, discord_player_1.useMainPlayer)();
        player.queues.get(ctx.guild).setRepeatMode(discord_player_1.QueueRepeatMode[mode.toUpperCase()]);
        return this.success();
    }
});
