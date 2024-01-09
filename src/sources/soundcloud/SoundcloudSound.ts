import SoundcloudSource = require(".");
import AudioSound = require("../../structures/AudioSound");
import prism = require("prism-media");
import { SoundcloudTrack } from "./types";

class SoundcloudSound extends AudioSound<SoundcloudTrack> {
    public sourceName = "soundcloud";
    #sc: SoundcloudSource;

    public constructor(metadata: SoundcloudTrack, soundcloud: SoundcloudSource) {
        super(metadata, {
            decoder: new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 }),
            demuxer: new prism.opus.OggDemuxer()
        });

        this.#sc = soundcloud;
    }

    public getAudioSource() {
        return this.#sc;
    }

}