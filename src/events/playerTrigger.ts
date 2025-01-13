import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Context, Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.PlayerTrigger,
    description: "Executed when the audio player is triggered.",
    async listener(queue, track, reason) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.PlayerTrigger)
        if (!commands) return;

        for (const command of commands) {
            const context = new Context({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, track, reason },
                data: command.compiled.code
            })

            await this.getExtension(ForgeMusic)
            .player
            .context
            .provide(context, () => Interpreter.run(context))
        }
    }
})