import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$playNext",
    version: "1.0.0",
    description: "Play the next track in the queue, if any.",
    unwrap: false,
    output: ArgType.Unknown,
    async execute(ctx) {
        await useQueue(ctx.guild).history.next();
        return this.success()
    }
})