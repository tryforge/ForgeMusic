"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("../utils/constants");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$isFilterEnabled",
    version: "1.0.0",
    description: "Check whether the provided filter is enabled.",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredEnum(constants_1.FFMPEGFilters, "Filters", "Filter names to be toggled.")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [filter]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        const allFilters = queue.filters.ffmpeg.getFiltersEnabled().concat(queue.filters.ffmpeg.getFiltersDisabled());
        const foundFilter = allFilters.find((fil) => fil.toLowerCase() === filter.toLowerCase());
        return this.success(queue.filters.ffmpeg.isEnabled(foundFilter));
    }
});
