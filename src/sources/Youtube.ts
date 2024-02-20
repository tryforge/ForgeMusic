import yts = require("yt-search");
import ytdl = require("ytdl-core");
import Harmony = require("../structures/Harmony");
import SourceExtension = require("../structures/SourceExtension");
import { FFmpeg } from "prism-media";
import { FFMPEG_ARGUMENTS, FFMPEG_FILTER_ARGUMENTS } from "../utils/constants";
import { SearchResult, SoundMetadata, SoundTrack } from "../utils";

class Youtube extends SourceExtension {
    public readonly sourceName = "youtube";
    init(harmony: Harmony) {}

    public validateSearch(query: string) {
        if (query.startsWith("ytsearch:")) return true;
        try {
            const url = new URL(query);
            if (url.hostname.startsWith("www.youtube.com")) return true;
            if (url.hostname.startsWith("m.youtube.com")) return true;
        } catch {}
        return false;
    }

    public validateTrack(track: SoundTrack) {
        if (track.sourceName === this.sourceName) return true;
        return false;
    }

    public async search(query: string): Promise<SearchResult | null> {
        try {
            const [search, q1] = query.split(":");

            if (search !== "ytsearch") {
                const url = new URL(query);
                const videoId = url.searchParams.get("v");
                const listId = url.searchParams.get("list");
                console.log(videoId, listId);

                // if (listId) return 
                if (videoId) {
                    const res = await yts.search({ videoId });
                    console.log(res)
                    return [this.buildTrack(res)];
                }
                return null;
            }

            if (search !== "ytsearch") return null;
            const results = await yts.search({ query: q1 });
            return results.videos.map(x => this.buildTrack(x))
        } catch (err) {
            throw err;
        }
    }

    public async createAudioMetadata(track: SoundTrack): Promise<SoundMetadata | null> {
        console.log(track.identifier)
        return {
            stream: ytdl(`https://www.youtube.com/watch?v=${track.identifier}`, { filter: "audioonly" }),
            decoder: new FFmpeg({ args: FFMPEG_FILTER_ARGUMENTS }),
            demuxer: undefined
        }
    }

    public buildTrack(data: yts.VideoSearchResult | yts.VideoMetadataResult, isLive: boolean = false): SoundTrack {
        return {
            title: data.title,
            sourceName: this.sourceName,
            duration: data.duration.seconds,
            identifier: data.videoId,
            author: data.author,
            isLiveStream: isLive,
            artworkId: data.thumbnail || ""
        }
    }
}

export = Youtube;