import voice = require("@discordjs/voice");
import EventEmitter = require("node:events");
import constants = require("../utils/constants");
import internal = require("node:stream");
import prism = require("prism-media");
import { SoundMetadata, SoundTrack } from "../utils";
import Harmony = require("./Harmony");

interface AudioPlayerNodeEvents {
    "connectionAdded": [connection: voice.VoiceConnection, node: HarmonyPlayer];
    "trackStarting": [track: SoundTrack];
    "trackStopped": [track: SoundTrack];
}

declare interface HarmonyPlayer {
    on<Event extends keyof AudioPlayerNodeEvents>(event: Event, listener: (...args: AudioPlayerNodeEvents[Event]) => void): this;
    once<Event extends keyof AudioPlayerNodeEvents>(event: Event, listener: (...args: AudioPlayerNodeEvents[Event]) => void): this;
    removeListener<Event extends keyof AudioPlayerNodeEvents>(event: Event, listener: (...args: AudioPlayerNodeEvents[Event]) => void): this;
    emit<Event extends keyof AudioPlayerNodeEvents>(event: Event, ...args: AudioPlayerNodeEvents[Event]): boolean;
    removeAllListeners<Event extends keyof AudioPlayerNodeEvents>(event: Event): this;
}

class HarmonyPlayer extends EventEmitter {
    public readonly id: string;
    public readonly voiceAudioPlayer = new voice.AudioPlayer({ debug: true });
    public readonly harmony: Harmony;
    #playingSound?: SoundMetadata;
    #audioResource?: voice.AudioResource<internal.PassThrough>;

    public constructor(id: string, harmony: Harmony) {
        super();
        
        this.id = id;
        this.harmony = harmony;
        this.voiceAudioPlayer.on("debug", console.log);
    }

    public get volume(): prism.VolumeTransformer | undefined {
        return this.#audioResource?.volume;
    }

    public async playSong(track: SoundTrack) {
        this.#detachAudio();

        if (! track) return;
        const sound = await this.harmony.createAudioMetadata(track);
        if (! sound) throw new Error(`no sound.`);

        this.#playingSound = sound;
        this.#audioResource = this.#createAudioResource();

        if (sound.demuxer) internal.pipeline(sound.stream, sound.demuxer, sound.decoder, constants.noop);
        else internal.pipeline(sound.stream, sound.decoder, constants.noop);
        
        this.#playingSound.decoder.pipe(this.#audioResource.metadata);
        this.voiceAudioPlayer.play(this.#audioResource);
    }

    #detachAudio() {
        if (this.#playingSound && this.#audioResource) {
            this.#playingSound.stream.unpipe(this.#audioResource.metadata);
            return true;
        }
        return false;
    }

    #createAudioResource() {
        const stream = new internal.PassThrough();
        return voice.createAudioResource(stream, {
            inputType: voice.StreamType.Arbitrary,
            inlineVolume: true,
            metadata: stream
        });
    }

    public listen(guildId: string): void;
    public listen(connection: voice.VoiceConnection): void;
    public listen(data: string | voice.VoiceConnection) {
        const connection = data instanceof voice.VoiceConnection ? data : 
            voice.getVoiceConnection(data);

        if (! connection) return;
        if (this.voiceAudioPlayer["subscribers"].find((x: voice.PlayerSubscription) => x.connection === connection))
            return connection.subscribe(this.voiceAudioPlayer);

        connection.on(voice.VoiceConnectionStatus.Disconnected, async () => {
            await Promise.race([
                await voice.entersState(connection, voice.VoiceConnectionStatus.Signalling, 5_000),
                await voice.entersState(connection, voice.VoiceConnectionStatus.Connecting, 5_000)
            ])
        });
        connection.on(voice.VoiceConnectionStatus.Destroyed, constants.noop);
        return connection.subscribe(this.voiceAudioPlayer);
    }
}

export = HarmonyPlayer;