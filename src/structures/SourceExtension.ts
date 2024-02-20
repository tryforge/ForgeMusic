import { SearchResult, SoundMetadata, SoundTrack } from "../utils";
import Harmony = require("./Harmony");

abstract class SourceExtension {
    /** The unique name for source extension */
    abstract sourceName: string;
    abstract init(harmony: Harmony): any;
    abstract search(query: string): Promise<SearchResult | null>;
    /** Determines if the query is able to be used by this source class */
    abstract validateSearch(query: string): boolean;
    /** Determines if the track is able to be used by this source class */
    abstract validateTrack(track: SoundTrack): boolean;
    abstract createAudioMetadata(track: SoundTrack): Promise<SoundMetadata | null>;
}

export = SourceExtension;