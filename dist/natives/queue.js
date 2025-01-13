"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("../utils/constants");
const node_vm_1 = require("node:vm");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$queue",
    description: "Returns queue songs resolving the given text placeholders.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalNumber("Start Index", "The queue song start index."),
        forgescript_1.Arg.optionalNumber("Limit", "The amount of queue songs to be retrieved."),
        forgescript_1.Arg.optionalString("Text", "The text to be resolved."),
        forgescript_1.Arg.optionalString("Separator", "The separator for each result.")
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [index, limit, text, separator]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        const tracks = queue.tracks.data;
        text ||= "{position} {track.title} | <@{track.requestedBy.username}>";
        const results = tracks.slice(index ?? 0, limit ?? undefined)
            .map((_, i) => text.replace(/\{position\}/g, String(i + 1)))
            .map((song, i) => {
            const matches = song.match(constants_1.PLACEHOLDER_PATTERN) ?? [];
            const context = (0, node_vm_1.createContext)({ track: tracks[i] });
            for (const match of matches) {
                const placeholderValue = match.slice(1, -1);
                const result = (0, node_vm_1.runInContext)(placeholderValue, context);
                song = song.replace(new RegExp(match, "g"), result);
            }
            return song;
        });
        return this.success(results.join(separator || ","));
    }
});
