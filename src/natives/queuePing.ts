import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queuePing",
    version: "1.0.0",
    description: "Returns the latency of the current guild queue.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(useQueue(ctx.guild).ping)
    }
})