import {
    AttachmentExtractor,
    DefaultExtractors,
} from '@discord-player/extractor'
import { GuildQueueEvent, QueueRepeatMode, QueryType } from 'discord-player'
import { ForgeMusic } from '@structures/ForgeMusic'

/**
 * An array including the events that are not supported.
 */
const blacklistedEvents = [
    'audioTracksAdd',
    'audioTracksRemove',
    'willPlayTrack',
    'willAutoPlay',
    'voiceStateUpdate',
]

/**
 * The list of all events.
 */
const AllEvents = Object.keys(GuildQueueEvent).filter(
    (event) => !blacklistedEvents.includes(event)
)

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
const withErrorEvents = (...events: GuildQueueEvent[]) => {
    return Array.from(
        new Set([GuildQueueEvent.Error, GuildQueueEvent.PlayerError, ...events])
    )
}

export {
    AllEvents,
    AttachmentExtractor,
    /**
     * Not fully stable.
     */
    DefaultExtractors,
    ForgeMusic,
    GuildQueueEvent,
    QueueRepeatMode,
    QueryType,
    withErrorEvents,
}
