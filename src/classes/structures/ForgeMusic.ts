import { type BaseExtractor, GuildNodeCreateOptions, GuildQueueEvent, Player, type PlayerInitOptions } from "discord-player"
import { EventManager, ForgeClient, ForgeExtension, Logger } from "@tryforge/forgescript"
import { MusicCommandManager, handlerName } from "@managers/MusicCommandManager"
import { type GatewayIntentsString } from "discord.js"
import { getVersion } from "@utils/getVersion"

/**
 * Constructor options of the music extension.
 */
interface ForgeMusicInitOptions extends PlayerInitOptions {
    /**
     * Options that are used when a guild node is created.
     */
    connectOptions?: Omit<GuildNodeCreateOptions<unknown>, "metadata">
    /**
     * Array of event names the extension must listen to.
     */
    events?: GuildQueueEvent[]
    /**
     * Predicate to load certain extractors.
     */
    includeExtractors?: typeof BaseExtractor[]
}

/**
 * The entrypoint of the forge music system.
 */
export class ForgeMusic extends ForgeExtension {
    /** Cock my beloved. <3 */
    public name = "ForgeMusic"
    public description = "A standard music library tailored for ForgeScript."
    public version = getVersion()

    /**
     * The entrypoint of the player application.
     */
    public player: Player
    /**
     * The music command manager.
     */
    public commands: MusicCommandManager
    /**
     * The required intents for this extension to work.
     */
    private requiredIntents: GatewayIntentsString[] = ["GuildVoiceStates"]

    /**
     * Creates an instance of the music extension.
     * @returns {ForgeMusic}
     */
    public constructor(private options?: ForgeMusicInitOptions) {
        super()
        if (this.#hasInvalidEvents()) {
            Logger.error("ForgeMusic found that you are using some of the following events:\n- VoiceStateUpdate\n- WillAutoPlay\n- WillPlayTrack\nthat aren't supported.")
            process.exit()
        }
    }

    /**
     * Starts the music extension.
     * @param client - The discord client instance.
     * @returns {void}
     */
    public init(client: ForgeClient) {
        // Checking if client has the required intents.
        if (!client.options.intents.has(this.requiredIntents[0])) {
            Logger.warn(`${this.name} requires the following intents to work: \"${this.requiredIntents[0]}\"`)
        }

        // Create a main player instance.
        this.player = new Player(client, this.options)
        // Create the command manager.
        this.commands = new MusicCommandManager(client)

        // Load the native functions.
        this.load(this.nativesLocation)

        // Load the events if available.
        if (this.options?.events?.length) {
            EventManager.load(handlerName, this.eventsLocation)
            client.events.load(handlerName, this.options.events)
        }

        // Loading the extractors.
        if (this.options.includeExtractors) {
            this.player.extractors.loadMulti(this.options.includeExtractors)
            .then(() => Logger.info("Extractors loaded successfully!"))
            .catch((e) => Logger.error("Unable to load the extractors; with reason: " + e))
        }
    }

    /**
     * Returns the events location.
     */
    public get eventsLocation() {
        return __dirname.replace(/classes(\\|\/)structures/, "events")
    }

    /**
     * Returns the native functions location.
     */
    public get nativesLocation() {
        return __dirname.replace(/classes(\\|\/)structures/, "natives")
    }

    /**
     * Returns the user-defined `on connect` options.
     */
    public get connectOptions() {
        return this.options.connectOptions
    }

    /**
     * Check whether given events list has invalid events.
     * @returns {boolean}
     */
    #hasInvalidEvents() {
        return this.options && this.options.events && this.options.events.some(this.#invalidEventPredicate)
    }

    /**
     * Event check predicate.
     * @param event - The event name.
     * @returns {boolean}
     */
    #invalidEventPredicate(event: GuildQueueEvent) {
        return event === GuildQueueEvent.VoiceStateUpdate || event === GuildQueueEvent.WillAutoPlay || event === GuildQueueEvent.WillPlayTrack
    }
}