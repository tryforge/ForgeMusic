"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeMusic = void 0;
const discord_player_1 = require("discord-player");
const forgescript_1 = require("@tryforge/forgescript");
const MusicCommandManager_1 = require("../managers/MusicCommandManager");
const getVersion_1 = require("../../utils/getVersion");
/**
 * The entrypoint of the forge music system.
 */
class ForgeMusic extends forgescript_1.ForgeExtension {
    options;
    /** Cock my beloved. <3 */
    name = "ForgeMusic";
    description = "A standard music library tailored for ForgeScript.";
    version = (0, getVersion_1.getVersion)();
    /**
     * The entrypoint of the player application.
     */
    player;
    /**
     * The music command manager.
     */
    commands;
    /**
     * The required intents for this extension to work.
     */
    requiredIntents = ["GuildVoiceStates"];
    /**
     * Creates an instance of the music extension.
     * @returns {ForgeMusic}
     */
    constructor(options) {
        super();
        this.options = options;
        if (this.#hasInvalidEvents()) {
            forgescript_1.Logger.error("ForgeMusic found that you are using some of the following events:\n- VoiceStateUpdate\n- WillAutoPlay\n- WillPlayTrack\nthat aren't supported.");
            process.exit();
        }
    }
    /**
     * Starts the music extension.
     * @param client - The discord client instance.
     * @returns {void}
     */
    init(client) {
        // Checking if client has the required intents.
        if (!client.options.intents.has(this.requiredIntents[0])) {
            forgescript_1.Logger.warn(`${this.name} requires the following intents to work: \"${this.requiredIntents[0]}\"`);
        }
        // Create a main player instance.
        this.player = new discord_player_1.Player(client, this.options);
        // Create the command manager.
        this.commands = new MusicCommandManager_1.MusicCommandManager(client);
        // Load the native functions.
        this.load(this.nativesLocation);
        // Load the events if available.
        if (this.options?.events?.length) {
            forgescript_1.EventManager.load(MusicCommandManager_1.handlerName, this.eventsLocation);
            client.events.load(MusicCommandManager_1.handlerName, this.options.events);
        }
        // Loading the extractors.
        if (this.options.includeExtractors) {
            this.player.extractors.loadMulti(this.options.includeExtractors)
                .then(() => forgescript_1.Logger.info("Extractors loaded successfully!"))
                .catch((e) => forgescript_1.Logger.error("Unable to load the extractors; with reason: " + e));
        }
    }
    /**
     * Returns the events location.
     */
    get eventsLocation() {
        return __dirname.replace(/classes(\\|\/)structures/, "events");
    }
    /**
     * Returns the native functions location.
     */
    get nativesLocation() {
        return __dirname.replace(/classes(\\|\/)structures/, "natives");
    }
    /**
     * Returns the user-defined `on connect` options.
     */
    get connectOptions() {
        return this.options.connectOptions;
    }
    /**
     * Check whether given events list has invalid events.
     * @returns {boolean}
     */
    #hasInvalidEvents() {
        return this.options && this.options.events && this.options.events.some(this.#invalidEventPredicate);
    }
    /**
     * Event check predicate.
     * @param event - The event name.
     * @returns {boolean}
     */
    #invalidEventPredicate(event) {
        return event === discord_player_1.GuildQueueEvent.VoiceStateUpdate || event === discord_player_1.GuildQueueEvent.WillAutoPlay || event === discord_player_1.GuildQueueEvent.WillPlayTrack;
    }
}
exports.ForgeMusic = ForgeMusic;
