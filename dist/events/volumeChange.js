"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicEventHandler_1 = require("../classes/handlers/MusicEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const discord_player_1 = require("discord-player");
/**
 * The event should be listen to.
 */
const eventName = discord_player_1.GuildQueueEvent.VolumeChange;
exports.default = new MusicEventHandler_1.MusicEventHandler({
    name: eventName,
    description: "Executed when audio player's volume is changed.",
    async listener(queue, oldVolume, newVolume) {
        const commands = this.getExtension(ForgeMusic_1.ForgeMusic).commands.get(eventName);
        if (!commands)
            return;
        for (const command of commands) {
            const context = new forgescript_1.Context({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, oldVolume, newVolume },
                data: command.compiled.code
            });
            await this.getExtension(ForgeMusic_1.ForgeMusic)
                .player
                .context
                .provide(context, () => forgescript_1.Interpreter.run(context));
        }
    }
});
