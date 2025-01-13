import { NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$clearQueueHistory",
    version: "1.0.0",
    description: "Clear the queue history.",
    unwrap: false,
    execute(ctx) {
        useQueue(ctx.guild).history.clear()
        return this.success()
    }
})