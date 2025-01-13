import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Context, Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.AudioTracksAdd,
    description: "Executed when multiple audio track are added to the queue.",
    async listener(queue, tracks) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.AudioTracksAdd)
        if (!commands) return;

        for (const command of commands) {
            const context = new Context({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, tracks },
                data: command.compiled.code
            })
            
            await this.getExtension(ForgeMusic)
            .player
            .context
            .provide(context, () => Interpreter.run(context))
        }
    }
})