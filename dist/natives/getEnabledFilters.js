"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$getEnabledFilters",
    version: "1.0.0",
    description: "Return the enabled FFMPEG filters.",
    unwrap: false,
    output: forgescript_1.ArgType.String,
    execute(ctx) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        return this.success(queue.filters.ffmpeg.getFiltersEnabled().join(","));
    }
});
