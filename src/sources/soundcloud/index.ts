import Soundcloud = require("./Soundcloud");
import AudioSource = require("../../structures/AudioSource");
import AudioSound = require("../../structures/AudioSound");
import { SoundcloudTrack } from "./types";

class SoundcloudSource extends AudioSource {
    public sourceName = "soundcloud";
    public readonly soundcloud = new Soundcloud();

    async loadTracks(query: string, limit = 20, offset = 0): Promise<AudioSound<AudioSoundMetadata>[] | null> {
        if (! this.soundcloud.clientId) await this.soundcloud.getClientID();

        const res = await this.soundcloud.search(query, "tracks", limit, offset);
        if (! res) return null;

        const tracks = res.collection.map(x => new AudioSound(x));
    }
}

export = SoundcloudSource