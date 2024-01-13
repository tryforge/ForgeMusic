import { AudioResource, StreamType, VoiceConnection, createAudioResource } from "@discordjs/voice";
import { entersState } from "@discordjs/voice";
import { VoiceConnectionStatus } from "@discordjs/voice";
import { getVoiceConnection } from "@discordjs/voice";
import { AudioPlayer } from "@discordjs/voice";
import EventEmitter = require("node:events");
import constants = require("../utils/constants");
import internal = require("node:stream");
import { VolumeTransformer, opus } from "prism-media";
import { AudioTrack } from "../utils";

interface AudioNodeEvents {
    "connectionAdded": [connection: VoiceConnection, node: AudioNode];
    "trackStarting": [track: AudioTrack];
    "trackStopped": [track: AudioTrack];

    // For misc stuffs
    "trackAudioStream": [track: AudioTrack, stream: internal.PassThrough | opus.Decoder];
}

declare interface AudioNode {
    on<Event extends keyof AudioNodeEvents>(event: Event, listener: (...args: AudioNodeEvents[Event]) => void): this;
    once<Event extends keyof AudioNodeEvents>(event: Event, listener: (...args: AudioNodeEvents[Event]) => void): this;
    removeListener<Event extends keyof AudioNodeEvents>(event: Event, listener: (...args: AudioNodeEvents[Event]) => void): this;
    emit<Event extends keyof AudioNodeEvents>(event: Event, ...args: AudioNodeEvents[Event]): boolean;
    removeAllListeners<Event extends keyof AudioNodeEvents>(event: Event): this;
}

class AudioNode extends EventEmitter {
    static readonly Instances = new Map<string, AudioNode>();
    public readonly id: string;
    readonly #AudioPlayer = new AudioPlayer();
    #playingSound?: AudioTrack;
    #audioResource?: AudioResource<internal.PassThrough>;

    public constructor(id: string) {
        super();
        this.id = id;
    }

    public get volume(): VolumeTransformer | undefined {
        return this.#audioResource?.volume;
    }

    public async playAudio(sound: AudioTrack) {
        if (this.#playingSound && this.#audioResource) {
            // this.#playingSound.unpipe(this.#audioResource.metadata);
        }

        if (! sound) return;
        this.#playingSound = sound;
        this.#audioResource = this.#createAudioResource();

        // this.#playingSound.pipe(this.#audioResource.metadata);
        this.#AudioPlayer.play(this.#audioResource);
    }

    #createAudioResource() {
        const stream = new internal.PassThrough();
        return createAudioResource(stream, {
            inputType: StreamType.Arbitrary,
            inlineVolume: true,
            metadata: stream
        });
    }

    public listen(guildId: string): void;
    public listen(connection: VoiceConnection): void;
    public listen(data: string | VoiceConnection) {
        const conn = data instanceof VoiceConnection ? data : getVoiceConnection(data);
        if (! conn) return;

        conn.on(VoiceConnectionStatus.Disconnected, async () => {
            await Promise.race([
                await entersState(conn, VoiceConnectionStatus.Signalling, 5_000),
                await entersState(conn, VoiceConnectionStatus.Connecting, 5_000)
            ])
        });
        conn.on(VoiceConnectionStatus.Destroyed, constants.noop);
    }
}

export = AudioNode;