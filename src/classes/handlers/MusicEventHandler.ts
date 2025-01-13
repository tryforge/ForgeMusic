import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { GuildQueueEvent, GuildQueueEvents } from "discord-player"
import { ForgeMusic } from "@structures/ForgeMusic"
import { GuildTextBasedChannel } from "discord.js"

/**
 * Fix the typings for the music event handler.
 */
export type TypedGuildQueueEvents = {
    [K in GuildQueueEvent]: Parameters<GuildQueueEvents<AdditionalMeta>[K]>
}

/**
 * The generic music event handler.
 */
export class MusicEventHandler<Events extends TypedGuildQueueEvents = TypedGuildQueueEvents, Names extends keyof Events = keyof Events> extends BaseEventHandler<Events, Names> {
    /**
     * Register this event.
     * @param client - ForgeClient instance.
     */
    public register(client: ForgeClient) {
        client.getExtension(ForgeMusic).player.events.on(this.name as keyof GuildQueueEvents, this.listener.bind(client))
    }
}

/**
 * Structure for additional information
 * to identify a song.
 */
export interface AdditionalMeta {
    /**
     * The text channel where the command was called.
     */
    text: GuildTextBasedChannel
}