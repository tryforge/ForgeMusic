import { SoundTrack } from ".";

export const FFMPEG_ARGUMENTS = [
    '-analyzeduration', 
    '0', 
    '-loglevel', 
    '0', 
    "-f",
    "s16le",
    "-ar",
    "48000",
    "-ac",
    "2",
    "-vn"
]

export const FFMPEG_FILTER_ARGUMENTS = [
    '-analyzeduration', 
    '0', 
    '-loglevel', 
    '0',
    "-f",
    "s16le",
    "-ar",
    "48000",
    "-ac",
    "2",
    "-i",
    "-",
    "-acodec",
    "pcm_s16le",
    "-f",
    "s16le",
    "-ar",
    "48000",
    "-ac",
    "2"
]

export const noop = () => {};
export const noopNull = () => null;
export const BYTES_PER_SECOND = 192000;
export const BPS = BYTES_PER_SECOND;

export const regex = {
    encodedTrackString: /([^:]+):([^_]+)_([^=]+)=(\d+)=([^=]+)=([^\?]+)\?(Y|N){1}_/
}

export const encode = (track: SoundTrack) => {
    // Regex /([^:]+):([^_]+)_([^=]+)=(\d+)=([^\?]+)\?(Y|N){1}_/
    return Buffer.from(`${track.sourceName}:${track.identifier}_${track.artworkId}=${track.duration}=${track.author.name}_${track.author.url}=${track.authorId}?${ track.isLiveStream ? "Y" : "N" }_${track.title}`)
        .toString("base64url");
}

export const decode = (encoded: string): SoundTrack => {
    const text = Buffer.from(encoded, "base64url").toString("utf-8");
    const [
        _,
        source,
        identifier,
        artworkId,
        duration,
        author,
        authorId,
        isStream,
        title
    ] = text.split(regex.encodedTrackString);

    const [authorName, authorURL] = author.split("_");
    
    return { sourceName: source, identifier, artworkId, author: { name: authorName, url: authorURL }, authorId, duration: Number(duration), isLiveStream: isStream === "Y", title };
}