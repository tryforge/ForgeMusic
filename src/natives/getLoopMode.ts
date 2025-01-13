import { QueueRepeatMode, useMainPlayer } from "discord-player"
import { NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$getLoopMode",
    version: "1.0.0",
    description: "Returns the state of the loop mode.",
    unwrap: false,
    output: QueueRepeatMode,
    execute(ctx) {
        const player = useMainPlayer()
        
        return this.success(Object.keys(QueueRepeatMode)[player.queues.get(ctx.guild).repeatMode])
    }
})