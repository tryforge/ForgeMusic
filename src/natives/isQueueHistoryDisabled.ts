import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$isQueueHistoryDisabled",
    version: "1.0.0",
    description: "Returns whether the queue history is disabled.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        const queue = useQueue(ctx.guild)
        if (!queue) {
            return this.customError("No queue found.")
        }

        return this.success(queue.history.disabled)
    }
})