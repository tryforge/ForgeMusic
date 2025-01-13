import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { PLACEHOLDER_PATTERN } from "@utils/constants"
import { createContext, runInContext } from "node:vm"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queue",
    description: "Returns queue songs resolving the given text placeholders.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        Arg.optionalNumber("Start Index", "The queue song start index."),
        Arg.optionalNumber("Limit", "The amount of queue songs to be retrieved."),
        Arg.optionalString("Text", "The text to be resolved."),
        Arg.optionalString("Separator", "The separator for each result.")

    ],
    output: ArgType.String,
    async execute(ctx, [index, limit, text, separator]) {
        const queue = useQueue(ctx.guild)
        const tracks = queue.tracks.data

        text ||= "{position} {track.title} | <@{track.requestedBy.username}>"

        const results = tracks.slice(index ?? 0, limit ?? undefined)
        .map((_, i) => text.replace(/\{position\}/g, String(i + 1)))
        .map((song, i) => {
            const matches = song.match(PLACEHOLDER_PATTERN) ?? []
            const context = createContext({ track: tracks[i] })

            for (const match of matches) {
                const placeholderValue = match.slice(1, -1)
                const result = runInContext(placeholderValue, context)
                song = song.replace(new RegExp(match, "g"), result)
            }

            return song
        })
        
        return this.success(results.join(separator || ","))
    }
})