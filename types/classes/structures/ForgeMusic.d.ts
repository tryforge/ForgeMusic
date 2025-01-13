import { type BaseExtractor, GuildNodeCreateOptions, GuildQueueEvent, Player, type PlayerInitOptions } from "discord-player";
import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { MusicCommandManager } from "../managers/MusicCommandManager";
/**
 * Constructor options of the music extension.
 */
interface ForgeMusicInitOptions extends PlayerInitOptions {
    /**
     * Options that are used when a guild node is created.
     */
    connectOptions?: Omit<GuildNodeCreateOptions<unknown>, "metadata">;
    /**
     * Array of event names the extension must listen to.
     */
    events?: GuildQueueEvent[];
    /**
     * Predicate to load certain extractors.
     */
    includeExtractors?: typeof BaseExtractor[];
}
/**
 * The entrypoint of the forge music system.
 */
export declare class ForgeMusic extends ForgeExtension {
    #private;
    private options?;
    /** Cock my beloved. <3 */
    name: string;
    description: string;
    version: string;
    /**
     * The entrypoint of the player application.
     */
    player: Player;
    /**
     * The music command manager.
     */
    commands: MusicCommandManager;
    /**
     * The required intents for this extension to work.
     */
    private requiredIntents;
    /**
     * Creates an instance of the music extension.
     * @returns {ForgeMusic}
     */
    constructor(options?: ForgeMusicInitOptions);
    /**
     * Starts the music extension.
     * @param client - The discord client instance.
     * @returns {void}
     */
    init(client: ForgeClient): void;
    /**
     * Returns the events location.
     */
    get eventsLocation(): string;
    /**
     * Returns the native functions location.
     */
    get nativesLocation(): string;
    /**
     * Returns the user-defined `on connect` options.
     */
    get connectOptions(): Omit<GuildNodeCreateOptions<unknown>, "metadata">;
}
export {};
