import { NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"
import hasQueue from "@utils/hasQueue"

export default new NativeFunction({
    name: "$leaveVoiceChannel",
    version: "1.0.0",
    description: "Destroys the current voice connection.",
    unwrap: false,
    async execute(ctx) {
        if (hasQueue(ctx)) {
            await useQueue(ctx.guild).connection.destroy()
        }

        return this.success()
    }
})