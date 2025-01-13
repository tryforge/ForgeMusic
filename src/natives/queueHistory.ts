import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { PLACEHOLDER_PATTERN } from "@utils/constants"
import { createContext, runInContext } from "node:vm"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queueHistory",
    description: "Returns queue history songs resolving the given text placeholders.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        Arg.optionalNumber("Start Index", "The queue song start index."),
        Arg.optionalNumber("Limit", "The amount of queue history songs to be retrieved."),
        Arg.optionalString("Text", "The text to be resolved."),
        Arg.optionalString("Separator", "The separator for each result.")

    ],
    output: ArgType.String,
    async execute(ctx, [index, limit, text, separator]) {
        const queue = useQueue(ctx.guild)
        let tracks = queue.history.tracks.data
        if (index) tracks = tracks.slice(index, limit ?? undefined);

        const resolvedTracks: string[] = []

        text ??= "{position} {track.title} | {track.requestedBy}"

        let i = 0, advance = () => i++
        for (const track of tracks) {
            let result = text.replace(/\{position\}/g, String(i + 1))

            const matches = result.match(PLACEHOLDER_PATTERN) ?? []
            if (matches.length === 0) {
                resolvedTracks.push(result)
                advance()
                continue
            }

            const context = createContext({ track })
            for (const match of matches) {
                const placeholderValue = match.slice(1, -1)
                const placeholderResult = runInContext(placeholderValue, context)

                result = result.replace(new RegExp(match, "g"), placeholderResult)
            }

            resolvedTracks.push(result)
            advance()
        }
        
        return this.success(resolvedTracks.join(separator ?? ","))
    }
})