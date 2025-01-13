"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("../utils/constants");
const node_vm_1 = require("node:vm");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const hasQueue_1 = __importDefault(require("../utils/hasQueue"));
exports.default = new forgescript_1.NativeFunction({
    name: "$searchTrack",
    version: "1.0.0",
    description: "Search for a track using the given query.",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString("Query", "The query to search for."),
        forgescript_1.Arg.requiredString("Text Result", "The formatted text result to return."),
        forgescript_1.Arg.optionalString("Separator", "The result separator."),
        forgescript_1.Arg.optionalString("Engine", "The query search engine, can be extractor name to target an specific one. (custom)"),
        forgescript_1.Arg.optionalEnum(discord_player_1.QueryType, "Fallback Engine", "Fallback search engine to use."),
        forgescript_1.Arg.optionalNumber("Limit", "The maximum number of results to return."),
        forgescript_1.Arg.optionalBoolean("Add To Player", "Whether add the results to the music player."),
        {
            name: "Block Extractors",
            description: "List of extractors to block.",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [query, text, separator, engine, fallbackEngine, limit, addToPlayer, blockedExtractors]) {
        const searchResult = await ctx.client.getExtension(ForgeMusic_1.ForgeMusic).player.search(query, {
            searchEngine: engine,
            fallbackSearchEngine: fallbackEngine,
            blockExtractors: blockedExtractors,
            requestedBy: ctx.user
        });
        const connectOptions = ctx.getExtension(ForgeMusic_1.ForgeMusic).connectOptions ?? {};
        const connectionOptionsUnion = {
            metadata: { text: ctx.channel },
            ...connectOptions
        };
        let tracks = searchResult.tracks;
        if (limit && tracks.length > limit)
            tracks = tracks.slice(0, limit);
        const formattedTracks = tracks.map((_, i) => text.replace(/\{position\}/g, String(i + 1)))
            .map((trackText, i) => {
            const track = tracks[i];
            const matches = trackText.match(constants_1.PLACEHOLDER_PATTERN) ?? [];
            const context = (0, node_vm_1.createContext)({ track });
            for (const match of matches) {
                const placeholderValue = match.slice(1, -1);
                const result = (0, node_vm_1.runInContext)(placeholderValue, context);
                trackText = trackText.replace(new RegExp(match, "g"), result);
            }
            return trackText;
        });
        if (addToPlayer && (0, hasQueue_1.default)(ctx))
            (0, discord_player_1.useQueue)(ctx.guild).addTrack(tracks);
        else if (addToPlayer && !(0, hasQueue_1.default)(ctx)) {
            const queue = await ctx.client.getExtension(ForgeMusic_1.ForgeMusic).player.queues.create(ctx.guild, connectionOptionsUnion);
            queue.addTrack(tracks);
        }
        return this.success(searchResult.tracks.length > 0 ? formattedTracks.join(separator ?? ",") : "");
    }
});
