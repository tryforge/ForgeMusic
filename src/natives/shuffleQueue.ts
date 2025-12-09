import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$shuffleQueue",
    version: "1.0.0",
    description: "Shuffle the queue when the current track ends, unlike $shuffleTracks that can be undone, this function does not mutates the queue.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        const queue = useQueue(ctx.guild)
        if (!queue) {
            return this.customError("No queue found.")
        }
        
        return this.success(queue.enableShuffle(true))
    }
})