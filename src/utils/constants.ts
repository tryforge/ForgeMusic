import { AudioTrack } from ".";

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

export const encode = (track: AudioTrack) => {
    // Regex /([^:]+):([^_]+)_([^=]+)=(\d+)=([^\?]+)\?(Y|N){1}_/
    return Buffer.from(`${track.sourceName}:${track.identifier}_${track.artworkId}=${track.duration}=${track.author}=${track.authorId}?${ track.isStream ? "Y" : "N" }_${track.title}`);
}

export const decode = (encoded: string): AudioTrack => {
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
    
    return { sourceName: source, identifier, artworkId, author, authorId, duration: Number(duration), isStream: isStream === "Y", title };
}