import internal = require("node:stream");
import lib = require("..");
import fs = require("node:fs");
import path = require("node:path");
import prism = require("prism-media");
import voice = require("@discordjs/voice");
import AudioSource = require("./AudioSource");
import constants = require("../utils/constants");
import { AudioSoundMetadata } from "../utils";


interface AudioSoundOptions {
    demuxer?: prism.opus.OggDemuxer | prism.opus.WebmDemuxer;
    decoder: prism.opus.Decoder | prism.FFmpeg;
}

abstract class AudioSound<Metadata extends AudioSoundMetadata = AudioSoundMetadata> extends internal.PassThrough {
    abstract get sourceName(): string;
    // These are important ones
    public readonly identifier: string;
    public readonly title: string;
    public readonly author: string;
    public readonly artworkId: string;
    public readonly isStream: boolean;
    readonly #metadata: Metadata;
    
    // Sound things
    #isLoaded?: boolean;
    #demuxer?: prism.opus.OggDemuxer | prism.opus.WebmDemuxer;
    #decoder: prism.opus.Decoder | prism.FFmpeg;
    #writer?: fs.WriteStream;

    public constructor(metadata: Metadata, options: AudioSoundOptions) {
        super();
        this.#metadata = metadata;
        this.#demuxer = options.demuxer;
        this.#decoder = options.decoder;
        this.identifier = metadata.identifier;
        this.title = metadata.title;
        this.artworkId = metadata.artworkId;
        this.author = metadata.author;
        this.isStream = metadata.isStream;

        let err; 
        try {
            const target = path.join(process.env.sound_cache_dir, this.encoded);
            const stat = fs.statSync(target);
            if (! stat.isFile()) {
                err = new Error(`Path is not a file. Path: "${target}"`)
                throw err;
            }

            this.#isLoaded = true;
        } catch {
            if (process.env.sound_auto_prepare) this.prepareAudio();
        }
        if (err) throw /* skil isue */ err;
    }

    // Methods are for utils
    abstract getTrackURL(): string;
    abstract getAuthorURL(): string;
    abstract getArtworkURL(): string;
    abstract getAudioSource(): AudioSource;
    
    // Load audio
    public async prepareAudio() {
        if (this.#isLoaded) {
            const stream = fs.createReadStream(path.join(process.env.sound_cache_dir, this.encoded));
            this.#decoder = new prism.FFmpeg({ args: constants.FFMPEG_ARGUMENTS });

            internal.pipeline(stream, this.#decoder, this, constants.noop);
            return;
        }

        if (this.#writer) throw new Error('audio is currently writing');
        const source = this.getAudioSource();
        const stream = await source.downloadAudio(this);

        if (! stream) throw new Error('no audio loaded.');

        const demuxer = this.#demuxer;
        const decoder = this.#decoder;
        
        const writer = fs.createWriteStream(path.join(process.env.sound_cache_dir, this.encoded));
        if (demuxer) {
            internal.pipeline(stream, demuxer, decoder, writer, constants.noop);
        } else {
            internal.pipeline(stream, decoder, writer, constants.noop);
        }
        this.#writer = writer;

        return await new Promise((res) => {
            writer.once("end", async () => {
                // Cleanup
                this.#demuxer = undefined;
                this.#decoder = <any>undefined;
                this.#writer = undefined;
                this.#isLoaded = true;
                this.emit('audioLoaded');

                await this.prepareAudio();
                res(undefined);
            });
        })
    }


    public waitForLoaded() {
        return new Promise((res) => this.once('audioLoaded', res));
    }

    public get isLoaded() {
        return this.#isLoaded;
    }

    public get encoded() {
        const buf = `${this.sourceName}=${this.identifier}=${this.author}=${this.artworkId}=${this.isStream}=${this.title}`;
        return Buffer.from(buf).toString("base64");
    }

    abstract decode(encoded: string): this;
    static decode(encoded: string) {
        const [
            sourceName,
            identifier,
            author,
            artworkId,
            isStream,
            ...title
        ] = Buffer.from(encoded, 'base64').toString("utf-8").split("=");

        return {
            sourceName,
            identifier,
            author,
            artworkId,
            isStream,
            title: title.join('=')
        }
    }
}

export = AudioSound;