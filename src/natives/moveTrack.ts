import { Arg, NativeFunction } from "@tryforge/forgescript"
import { useMainPlayer } from "discord-player"

export default new NativeFunction({
    name: "$moveTrack",
    version: "1.0.0",
    description: "Moves the track to a new position.",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredNumber("Position", "The track position to be moved."),
        Arg.requiredNumber("New Position", "The new position of the track.")
    ],
    execute(ctx, [position, newPosition]) {
        const player = useMainPlayer()
        const queue = player.queues.get(ctx.guild)
        const track = queue.node.remove(position)

        queue.node.insert(track, newPosition)

        return this.success()
    }
})