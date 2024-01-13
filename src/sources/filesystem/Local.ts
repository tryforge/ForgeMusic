import MusicExtension = require("../../extension/MusicExtension");
import AudioSource = require("../../structures/AudioSource");
import fs = require("node:fs");
import { AudioTrack, LoadTracksResult } from "../../utils";
import path = require("node:path");
import { opus, FFmpeg } from "prism-media";
import { Readable } from "stream";
import { StreamType, demuxProbe } from "@discordjs/voice";
import prism = require('prism-media');
import { BYTES_PER_SECOND, FFMPEG_ARGUMENTS } from "../../utils/constants";

class Local extends AudioSource {
    public readonly sourceName = "local";
    #soundsFolder = path.join(process.cwd(), "sounds")

    public init(extension: MusicExtension) {
        const p = extension.config.get("FolderSoundsPath");
        if (! (typeof p === "string")) return;
        this.#soundsFolder = p;
    }

    public async loadTracks(query: string, limit = -1, offset = 0): Promise<LoadTracksResult | null> {
        const p = path.join(this.#soundsFolder, query);
        if (! fs.existsSync(p)) return null;

        const stat = await fs.promises.stat(p);
        if (stat.isFile()) {
            return {
                collection: [ {
                    artworkId: "",
                    author: "",
                    authorId: "system",
                    identifier: query,
                    title: path.basename(p),
                    isStream: false,
                    sourceName: this.sourceName,
                    duration: stat.size / BYTES_PER_SECOND
                } ],
                limit: 1,
                offset: 0,
                type: "track",

                title: "",
                description: "",
                author: "",
                countResults: 1
            }
        }

        if (stat.isDirectory()) {
            // Load multiple mp3's
            const knownFormats = ["mp3", 'aac', "flac", "m4a", "ogg", "wav", "webm"].map(x => "." + x);
            const filter = (await fs.promises.readdir(p)).filter(x => knownFormats.includes(path.extname(x)))
            .slice(offset, limit === -1 ? undefined : limit);

            const build = (stat: fs.Stats, identifier: string): AudioTrack => {
                return {
                    artworkId: "",
                    author: "",
                    authorId: "system",
                    identifier: path.join(query, identifier),
                    title: identifier,
                    isStream: false,
                    sourceName: this.sourceName,
                    duration: stat.size / BYTES_PER_SECOND
                }
            }

            return {
                collection: await Promise.all(filter.map(async id => build(await fs.promises.stat(id), id))),
                limit: limit,
                offset: offset,
                type: "playlist",
                
                title: path.basename(query),
                description: "",
                author: "system",
                countResults: filter.length
            }
        }

        return null;
    }
    
    public async createAudioStream(track: AudioTrack): Promise<{ demuxer?: opus.OggDemuxer | opus.WebmDemuxer | undefined; decoder: opus.Decoder | FFmpeg; stream: Readable; } | null> {
        const { stream, type } = await demuxProbe(fs.createReadStream(path.join(this.#soundsFolder, track.identifier)));

        const demuxer = type === StreamType.OggOpus ? new prism.opus.OggDemuxer() :
            type === StreamType.WebmOpus ? new prism.opus.WebmDemuxer : undefined;

        const decoder = demuxer ? new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 }) :
            new prism.FFmpeg({ args: FFMPEG_ARGUMENTS });
        
        return { demuxer, decoder, stream };
    }
}

export = Local;