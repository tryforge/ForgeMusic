import { ForgeMusic } from "@structures/ForgeMusic"
import { Context } from "@tryforge/forgescript"

export default function(ctx: Context) {
    const extension = ctx.client.getExtension(ForgeMusic)
    const queue = extension.player.queues.get(ctx.guild)

    return queue
}