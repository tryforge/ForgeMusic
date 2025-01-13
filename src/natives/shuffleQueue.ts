import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$shuffleQueue",
    version: "1.0.0",
    description: "Shuffle the queue when the current track ends, unlike $shuffleTracks that can be undone, this function does not mutates the queue.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(useQueue(ctx.guild).enableShuffle(true))
    }
})