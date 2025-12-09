import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queuePing",
    version: "1.0.0",
    description: "Returns the latency of the current guild queue.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        const queue = useQueue(ctx.guild)
        if (!queue) {
            return this.customError("No queue found.")
        }
        
        return this.success(queue.ping)
    }
})