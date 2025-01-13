import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Context, Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.AudioTrackAdd,
    description: "Executed when audio track is added to the queue.",
    async listener(queue, track) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.AudioTrackAdd)
        if (!commands) return;

        for (const command of commands) {
            const context = new Context({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, track },
                data: command.compiled.code
            })

            await this.getExtension(ForgeMusic)
            .player
            .context
            .provide(context, () => Interpreter.run(context))
        }
    }
})