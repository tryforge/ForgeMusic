import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useMainPlayer } from "discord-player"

export default new NativeFunction({
    name: "$isPlaying",
    version: "1.0.0",
    description: "Check whether the music player is playing a track.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        const player = useMainPlayer()
        return this.success(player.queues.get(ctx.guild).isPlaying())
    }
})