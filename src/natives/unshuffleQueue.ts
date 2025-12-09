import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$unshuffleQueue",
    version: "1.0.0",
    description: "Disable shuffle mode for the queue.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        const queue = useQueue(ctx.guild)
        if (!queue) {
            return this.customError("No queue found.")
        }
        
        return this.success(queue.disableShuffle())
    }
})