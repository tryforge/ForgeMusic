import internal = require("node:stream");
import prism = require("prism-media");
import MusicExtension = require("../extension/MusicExtension");
import { AudioTrack, LoadTracksResult } from "../utils";

abstract class AudioSource {
    abstract sourceName: string;

    abstract init(extension: MusicExtension): any;
    abstract loadTracks(query: string, limit?: number, offset?: number): Promise<LoadTracksResult | null>;
    abstract createAudioStream(track: AudioTrack): Promise<{
        demuxer?: prism.opus.OggDemuxer | prism.opus.WebmDemuxer;
        decoder: prism.opus.Decoder | prism.FFmpeg;
        stream: internal.Readable;
    } | null>;
}

export = AudioSource;