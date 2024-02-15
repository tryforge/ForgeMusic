import internal = require("node:stream");
import { FFmpeg, opus } from "prism-media";

enum AudioPlayerNodeEvents {
    ConnectionAdded = "connectionAdded"
}

interface SoundTrack {
    title: string;
    identifier: string;
    sourceName: string;
    author: { name: string, url: string };
    artworkId: string;
    isLiveStream: boolean;
    duration: number;
    [x: string]: any;
}

interface PlaylistInfo {
    name: string;
    author: { name: string, url: string };
    url: string;
    sourceName: string;
    size: number;
    tracks: SoundTrack[];
}

interface SoundMetadata {
    stream: internal.Readable;
    decoder: FFmpeg | opus.Decoder;
    demuxer?: opus.WebmDemuxer | opus.OggDemuxer;
}

type SearchResult = (SoundTrack | PlaylistInfo)[];

export {
    AudioPlayerNodeEvents,
    SoundTrack,
    PlaylistInfo,
    SoundMetadata,
    SearchResult
}