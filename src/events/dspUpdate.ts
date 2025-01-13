import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Context, Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { GuildQueueEvent } from "discord-player"

/**
 * The event should be listen to.
 */
const eventName = GuildQueueEvent.DSPUpdate

export default new MusicEventHandler({
    name: eventName,
    description: "Executed when dsp filters are updated.",
    async listener(queue, oldFilters, newFilters) {
        const commands = this.getExtension(ForgeMusic).commands.get(eventName)
        if (!commands) return;

        for (const command of commands) {
            const context = new Context({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, oldFilters, newFilters },
                data: command.compiled.code
            })
            
            await this.getExtension(ForgeMusic)
            .player
            .context
            .provide(context, () => Interpreter.run(context))
        }
    }
})