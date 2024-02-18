import { SearchResult, SoundMetadata, SoundTrack } from "../utils";
import Harmony = require("./Harmony");

abstract class SourceExtension {
    abstract init(harmony: Harmony): any;
    abstract search(query: string): Promise<SearchResult | null>;
    abstract createAudioMetadata(track: SoundTrack): Promise<SoundMetadata | Error | null>;
}

export = SourceExtension;