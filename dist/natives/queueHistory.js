"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("../utils/constants");
const node_vm_1 = require("node:vm");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$queueHistory",
    description: "Returns queue history songs resolving the given text placeholders.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalNumber("Start Index", "The queue song start index."),
        forgescript_1.Arg.optionalNumber("Limit", "The amount of queue history songs to be retrieved."),
        forgescript_1.Arg.optionalString("Text", "The text to be resolved."),
        forgescript_1.Arg.optionalString("Separator", "The separator for each result.")
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [index, limit, text, separator]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild);
        let tracks = queue.history.tracks.data;
        if (index)
            tracks = tracks.slice(index, limit ?? undefined);
        const resolvedTracks = [];
        text ??= "{position} {track.title} | {track.requestedBy}";
        let i = 0, advance = () => i++;
        for (const track of tracks) {
            let result = text.replace(/\{position\}/g, String(i + 1));
            const matches = result.match(constants_1.PLACEHOLDER_PATTERN) ?? [];
            if (matches.length === 0) {
                resolvedTracks.push(result);
                advance();
                continue;
            }
            const context = (0, node_vm_1.createContext)({ track });
            for (const match of matches) {
                const placeholderValue = match.slice(1, -1);
                const placeholderResult = (0, node_vm_1.runInContext)(placeholderValue, context);
                result = result.replace(new RegExp(match, "g"), placeholderResult);
            }
            resolvedTracks.push(result);
            advance();
        }
        return this.success(resolvedTracks.join(separator ?? ","));
    }
});
