import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$isQueueHistoryEmpty",
    version: "1.0.0",
    description: "Returns whether the queue history is empty.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(useQueue(ctx.guild).history.isEmpty())
    }
})