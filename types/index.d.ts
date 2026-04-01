import { AttachmentExtractor, DefaultExtractors } from '@discord-player/extractor';
import { GuildQueueEvent, QueueRepeatMode, QueryType } from 'discord-player';
import { ForgeMusic } from './classes/structures/ForgeMusic';
/**
 * The list of all events.
 */
declare const AllEvents: string[];
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
declare const withErrorEvents: (...events: GuildQueueEvent[]) => GuildQueueEvent[];
export { AllEvents, AttachmentExtractor, 
/**
 * Not fully stable.
 */
DefaultExtractors, ForgeMusic, GuildQueueEvent, QueueRepeatMode, QueryType, withErrorEvents, };
