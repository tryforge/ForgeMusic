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