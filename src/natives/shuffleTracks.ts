import { NativeFunction } from "@tryforge/forgescript"
import { useMainPlayer } from "discord-player"

export default new NativeFunction({
    name: "$shuffleTracks",
    version: "1.0.0",
    description: "Shuffle the current guild queue.",
    unwrap: false,
    execute(ctx) {
        const player = useMainPlayer()

        player.queues.get(ctx.guild).tracks.shuffle()

        return this.success()
    }
})