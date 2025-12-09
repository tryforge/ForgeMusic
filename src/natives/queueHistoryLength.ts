import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queueHistoryLength",
    version: "1.0.0",
    description: "Returns the length of the tracks that were played.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        const queue = useQueue(ctx.guild)
        if (!queue) {
            return this.customError("No queue found.")
        }
        
        return this.success(queue.history.tracks.data.length)
    }
})