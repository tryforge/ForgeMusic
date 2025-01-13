import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queueHistoryLength",
    version: "1.0.0",
    description: "Returns the length of the tracks that were played.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(useQueue(ctx.guild).history.tracks.data.length)
    }
})