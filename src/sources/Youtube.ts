import yts = require("yt-search");
import ytdl = require("ytdl-core");
import Harmony = require("../structures/Harmony");
import SourceExtension = require("../structures/SourceExtension");
import { FFmpeg } from "prism-media";
import { FFMPEG_ARGUMENTS } from "../utils/constants";
import { SearchResult, SoundMetadata, SoundTrack } from "../utils";

class Youtube extends SourceExtension {
    init(harmony: Harmony) {}
    public async search(query: string): Promise<SearchResult | null> {
        const results = await yts.search({ query });
        return results.videos.map(x => this.buildTrack(x))
    }

    public async createAudioMetadata(track: SoundTrack): Promise<SoundMetadata | Error | null> {
        return {
            stream: ytdl(`https://www.youtube.com/watch?v=${track.identifier}`),
            decoder: new FFmpeg({ args: FFMPEG_ARGUMENTS }),
            demuxer: undefined
        }
    }

    public buildTrack(data: yts.VideoSearchResult | yts.VideoMetadataResult, isLive: boolean = false): SoundTrack {
        return {
            title: data.title,
            sourceName: "youtube",
            duration: data.duration.seconds,
            identifier: data.videoId,
            author: data.author,
            isLiveStream: isLive,
            artworkId: data.thumbnail || ""
        }
    }
}