import { ForgeClient, ForgeExtension, FunctionManager } from "@tryforge/forgescript";
import ytdl from "ytdl-core";
import yts from "yt-search";
import path from "path";

const RegexHttpUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
const SymbolGet = Symbol("ForgeMusic")

declare module "@tryforge/forgescript" {
    interface ForgeClient {
        [SymbolGet]: Extension
    }
}

export type ResourceInfo = 
{
    kind: "track" | "playlist"
    title: string
    description?: string
    authorName: string
    authorUrl: string

    url: string
    identifier: string
    sourceName: string
    artworkUrl: string
}

export type PlayableResource =
{
    info: ResourceInfo
    extension: Extension
    download(): Promise<ReadableStream>
}

export type LoadRequest = 
{
    type: "track" | "playlist" | "search" | "empty" | "error"
    data: (PlayableResource | PlayableResource[] | never)[]
}

export class Extension extends ForgeExtension {
    public readonly name = "Forge.Music"
    public readonly description = ""
    public readonly version = "v1.0.0"
    public init(client: ForgeClient) {
        client[SymbolGet] = this
        FunctionManager.load(this.name, path.join(__dirname, "./functions"))
    }

    public async search(query: string) {
        if (query.match(RegexHttpUrl)) {
            // URL Searching
            const url = new URL(query)
            
            switch(url.hostname) {
                // Youtube
                case "youtube.com":
                case "www.youtube.com": 
                {
                    // Video
                    if (url.pathname === "/watch") {
                        const videoId = url.searchParams.get("v")
                        const video = await yts.search({ videoId })
                        const info: ResourceInfo =
                        {
                            kind: "track",
                            url: video.url,
                            title: video.title,
                            description: video.description,
                            identifier: video.videoId,
                            authorName: video.author.name,
                            authorUrl: video.author.url,
                            sourceName: "youtube",
                            artworkUrl: video.image
                        }
                        const resource: PlayableResource = 
                        {
                            info,
                            extension: this,
                            async download() {
                                const videoInfo = await ytdl.getInfo(video.url)
                                const opusFormat = videoInfo
                            }
                        }
                    }
                }
            }
        }
    }

    static getInstance(client: ForgeClient) {
        return client[SymbolGet] || null
    }

    [Symbol.for("nodejs.inspect.custom")]() {
        return "class Forge.Music { [native code] }"
    }
}