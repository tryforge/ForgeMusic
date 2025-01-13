import { QueryType, SearchQueryType, useMainPlayer } from "discord-player"
import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseChannel, VoiceBasedChannel } from "discord.js"
import { ForgeMusic } from "@structures/ForgeMusic"

export default new NativeFunction({
    name: "$playTrack",
    version: "1.0.0",
    description: "Play a track by query.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Channel ID",
            description: "Voice channel ID to play the track on.",
            type: ArgType.Channel,
            required: true,
            rest: false,
            check: (c: BaseChannel) => c.isVoiceBased()
        },
        Arg.requiredString("Query", "Track name to be searched."),
        Arg.optionalString("Engine", "The query search engine, can be extractor name to target an specific one. (custom)"),
        Arg.optionalEnum(QueryType, "Fallback Engine", "Fallback search engine to use."),
        {
            name: "Block Extractors", 
            description: "List of extractors to block.",
            type: ArgType.String,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [voiceChannel, query, searchEngine, fallbackSearchEngine, blockExtractors]) {
        const player = useMainPlayer()
        const connectOptions = ctx.getExtension(ForgeMusic).connectOptions ?? {}
        const connectionOptionsUnion = {
            metadata: { text: ctx.channel },
            ...connectOptions
        }

        let executed = true
        const result = await player.play(<VoiceBasedChannel>voiceChannel, query, {
            nodeOptions: connectionOptionsUnion,
            searchEngine: searchEngine as (SearchQueryType | `ext:${string}`) | undefined,
            fallbackSearchEngine,
            blockExtractors,
            requestedBy: ctx.user
        }).catch((e) => {
            executed = false
            return e
        })

        return executed ? this.success() : this.error(result)
    }
})