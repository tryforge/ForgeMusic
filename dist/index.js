"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorEvents = exports.QueryType = exports.QueueRepeatMode = exports.GuildQueueEvent = exports.ForgeMusic = exports.DefaultExtractors = exports.AttachmentExtractor = exports.AllEvents = void 0;
const extractor_1 = require("@discord-player/extractor");
Object.defineProperty(exports, "AttachmentExtractor", { enumerable: true, get: function () { return extractor_1.AttachmentExtractor; } });
Object.defineProperty(exports, "DefaultExtractors", { enumerable: true, get: function () { return extractor_1.DefaultExtractors; } });
const discord_player_1 = require("discord-player");
Object.defineProperty(exports, "GuildQueueEvent", { enumerable: true, get: function () { return discord_player_1.GuildQueueEvent; } });
Object.defineProperty(exports, "QueueRepeatMode", { enumerable: true, get: function () { return discord_player_1.QueueRepeatMode; } });
Object.defineProperty(exports, "QueryType", { enumerable: true, get: function () { return discord_player_1.QueryType; } });
const ForgeMusic_1 = require("./classes/structures/ForgeMusic");
Object.defineProperty(exports, "ForgeMusic", { enumerable: true, get: function () { return ForgeMusic_1.ForgeMusic; } });
/**
 * An array including the events that are not supported.
 */
const blacklistedEvents = [
    'audioTracksAdd',
    'audioTracksRemove',
    'willPlayTrack',
    'willAutoPlay',
    'voiceStateUpdate',
];
/**
 * The list of all events.
 */
const AllEvents = Object.keys(discord_player_1.GuildQueueEvent).filter((event) => !blacklistedEvents.includes(event));
exports.AllEvents = AllEvents;
/**
 * Returns an array including the given events and the error events.
 * @param events The events to be included.
 * @returns An array including the given events and the error events.
 * @example
 * ```typescript
 * // This:
 * events: [GuildQueueEvent.AudioTracksAdd, GuildQueueEvent.PlayerStart, GuildQueueEvent.Error, GuildQueueEvent.PlayerError]
 *
 * // is the same as:
 * events: withErrorEvents(GuildQueueEvent.AudioTracksAdd, GuildQueueEvent.PlayerStart)
 * ```
 */
const withErrorEvents = (...events) => {
    return Array.from(new Set([discord_player_1.GuildQueueEvent.Error, discord_player_1.GuildQueueEvent.PlayerError, ...events]));
};
exports.withErrorEvents = withErrorEvents;
