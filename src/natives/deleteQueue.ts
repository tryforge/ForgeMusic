import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$deleteQueue",
    version: "1.0.0",
    description: "Deletes the queue of the current guild.",
    unwrap: false,
    output: ArgType.Unknown,
    execute(ctx) {
        if (useQueue(ctx.guild)) {
            useQueue(ctx.guild).delete()
        }

        return this.success()
    }
})