import { ForgeMusic } from "@structures/ForgeMusic"
import { Context } from "@tryforge/forgescript"

export default function(ctx: Context) {
    const extension = ctx.client.getExtension(ForgeMusic)

    return extension.player.queues.has(ctx.guild)
}