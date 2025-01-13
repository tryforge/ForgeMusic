import { BaseCommandManager } from "@tryforge/forgescript";
import { GuildQueueEvent } from "discord-player";
/**
 * Common music handler name.
 */
export declare const handlerName = "ForgeMusic";
/**
 * The music command manager.
 */
export declare class MusicCommandManager extends BaseCommandManager<`${GuildQueueEvent}`> {
    handlerName: string;
}
