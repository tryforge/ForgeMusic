import internal = require("node:stream");
import AudioSound = require("./AudioSound");

abstract class AudioSource {
    abstract sourceName: string;

    abstract loadTracks(query: string, limit?: number, offset?: number): Promise<AudioSound[] | null>;
    abstract downloadAudio(sound: AudioSound): Promise<internal.Readable | null>;
}

export = AudioSource;