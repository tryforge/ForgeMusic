"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$moveTrack",
    version: "1.0.0",
    description: "Moves the track to a new position.",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredNumber("Position", "The track position to be moved."),
        forgescript_1.Arg.requiredNumber("New Position", "The new position of the track.")
    ],
    execute(ctx, [position, newPosition]) {
        const player = (0, discord_player_1.useMainPlayer)();
        const queue = player.queues.get(ctx.guild);
        const track = queue.node.remove(position);
        queue.node.insert(track, newPosition);
        return this.success();
    }
});
