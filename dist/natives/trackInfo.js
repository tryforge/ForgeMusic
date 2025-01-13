"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$trackInfo",
    version: "1.0.0",
    description: "Returns information of the current track.",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.restString("Properties", "The track properties to be accesed.")
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [properties]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        const track = queue.currentTrack;
        ctx.setEnvironmentKey("myTrack", track);
        const got = ctx.getEnvironmentKey(...["myTrack", ...properties]);
        ctx.deleteEnvironmentKey("myTrack");
        return this.success(got);
    }
});
