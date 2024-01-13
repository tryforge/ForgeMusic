import path = require("node:path");
import fs = require("node:fs");
import prism = require("prism-media");
import MusicExtension = require("../../extension/MusicExtension");
import AudioSource = require("../../structures/AudioSource");
import { AudioTrack, LoadTracksResult } from "../../utils";
import { FFMPEG_ARGUMENTS, decode, encode } from "../../utils/constants";
import { Readable } from "stream";

/**
 * A source for creating an audio cache and retreiving it
 */
class TemporaryAudio extends AudioSource {
    public readonly sourceName = "temp";
    #tempFileExtension = ".eepy";
    #tempFolder = path.join(process.cwd(), ".musictemp");

    public init(extension: MusicExtension) {
        const p = extension.config.get("TempAudioPath") || this.#tempFolder;
        if (typeof p !== "string") return;
        if (! fs.existsSync(p)) {
            fs.mkdirSync(p, { recursive: true });
            return;
        }

        const stat = fs.statSync(p);
        if (! stat.isDirectory()) 
            throw new Error(`The following path is not a directory!\n\tLocation: ${path.resolve(p)}`);
        this.#tempFolder = p;
        // Uh misc
        this.#tempFileExtension = <string>extension.config.get("TempAudioFileExtension") || this.#tempFileExtension;
    }
    
    /**
     * This only accepts encoded string files.
     * @param query 
     * @param limit 
     * @param offset 
     */
    public async loadTracks(query: string, limit?: number | undefined, offset?: number | undefined): Promise<LoadTracksResult | null> {
        const tracks = query.split(",").slice(limit, offset)
        .filter(encoded => fs.existsSync(path.join(this.#tempFolder, encoded + this.#tempFileExtension)))
        .map( encoded => decode(encoded) )

        return {
            collection: tracks.map(info => {
                return {
                    ...info,
                    sourceName: this.sourceName,
                    previousSource: info.sourceName
                }
            }),
            limit: limit || -1,
            offset: offset || 0,
            type: "search",
            
            title: "",
            description: "",
            author: "",
            countResults: tracks.length
        }
    }

    public async createAudioStream(track: AudioTrack<unknown>): Promise<{ demuxer?: prism.opus.OggDemuxer | prism.opus.WebmDemuxer | undefined; decoder: prism.opus.Decoder | prism.FFmpeg; stream: Readable; } | null> {
        return {
            demuxer: undefined,
            decoder: new prism.FFmpeg({ args: FFMPEG_ARGUMENTS }),
            stream: fs.createReadStream(path.join(this.#tempFolder, encode(track) + this.#tempFileExtension))
        }
    }

    public async clearTempAudio() {
        const list = await fs.promises.readdir(this.#tempFolder);
        for (const fname of list.filter(fname => fname.endsWith(this.#tempFileExtension))) {
            fs.promises.unlink(path.join(this.#tempFolder, fname));
        }
    }
}