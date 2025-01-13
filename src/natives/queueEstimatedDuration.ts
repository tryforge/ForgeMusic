import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$queueEstimatedDuration",
    version: "1.0.0",
    description: "Returns the estimated duration of the current guild queue in milliseconds.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(useQueue(ctx.guild).estimatedDuration)
    }
})