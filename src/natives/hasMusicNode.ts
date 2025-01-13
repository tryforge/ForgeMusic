import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useMainPlayer } from "discord-player"

export default new NativeFunction({
    name: "$hasMusicNode",
    version: "1.0.0",
    description: "Check whether the current guild has a music node created.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(useMainPlayer().nodes.has(ctx.guild))
    }
})