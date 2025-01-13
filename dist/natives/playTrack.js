"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
exports.default = new forgescript_1.NativeFunction({
    name: "$playTrack",
    version: "1.0.0",
    description: "Play a track by query.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Channel ID",
            description: "Voice channel ID to play the track on.",
            type: forgescript_1.ArgType.Channel,
            required: true,
            rest: false,
            check: (c) => c.isVoiceBased()
        },
        forgescript_1.Arg.requiredString("Query", "Track name to be searched."),
        forgescript_1.Arg.optionalString("Engine", "The query search engine, can be extractor name to target an specific one. (custom)"),
        forgescript_1.Arg.optionalEnum(discord_player_1.QueryType, "Fallback Engine", "Fallback search engine to use."),
        {
            name: "Block Extractors",
            description: "List of extractors to block.",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [voiceChannel, query, searchEngine, fallbackSearchEngine, blockExtractors]) {
        const player = (0, discord_player_1.useMainPlayer)();
        const connectOptions = ctx.getExtension(ForgeMusic_1.ForgeMusic).connectOptions ?? {};
        const connectionOptionsUnion = {
            metadata: { text: ctx.channel },
            ...connectOptions
        };
        let executed = true;
        const result = await player.play(voiceChannel, query, {
            nodeOptions: connectionOptionsUnion,
            searchEngine: searchEngine,
            fallbackSearchEngine,
            blockExtractors,
            requestedBy: ctx.user
        }).catch((e) => {
            executed = false;
            return e;
        });
        return executed ? this.success() : this.error(result);
    }
});
