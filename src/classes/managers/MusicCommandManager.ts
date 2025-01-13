import { BaseCommandManager } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

/**
 * Common music handler name.
 */
export const handlerName = "ForgeMusic"

/**
 * The music command manager.
 */
export class MusicCommandManager extends BaseCommandManager<`${GuildQueueEvent}`> {
    handlerName = handlerName
}