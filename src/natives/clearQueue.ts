import { NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$clearQueue",
    version: "1.0.0",
    description: "Clear the guild queue.",
    unwrap: false,
    execute(ctx) {
        const queue = useQueue(ctx.guild)

        queue.clear()

        return this.success()
    }
})