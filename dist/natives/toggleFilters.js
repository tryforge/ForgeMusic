"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("../utils/constants");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$toggleFilters",
    version: "1.0.0",
    description: "Toggle the provided FFMPEG filters.",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.restEnum(constants_1.FFMPEGFilters, "Filters", "Filter names to be toggled.")],
    async execute(ctx, [filters]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        const allFilters = queue.filters.ffmpeg.getFiltersEnabled().concat(queue.filters.ffmpeg.getFiltersDisabled());
        for (const filter of filters) {
            const foundFilter = allFilters.find((fil) => fil.toLowerCase() === filter.toLowerCase());
            await queue.filters.ffmpeg.toggle(foundFilter);
        }
        return this.success();
    }
});
