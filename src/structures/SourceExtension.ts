import MusicExtension = require("../extension/MusicExtension");
import { SearchResult, SoundMetadata, SoundTrack } from "../utils";

abstract class SourceExtension {

    abstract init(extension: MusicExtension): any;
    abstract search(query: string): Promise<SearchResult | null>;
    abstract createAudioMetadata(track: SoundTrack): Promise<SoundMetadata | Error | null>;
}

export = SourceExtension;