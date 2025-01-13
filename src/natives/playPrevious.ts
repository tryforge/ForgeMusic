import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$playPrevious",
    version: "1.0.0",
    description: "Play the previous track in the queue history, if any.",
    unwrap: false,
    output: ArgType.Unknown,
    async execute(ctx) {
        await useQueue(ctx.guild).history.previous();
        return this.success()
    }
})