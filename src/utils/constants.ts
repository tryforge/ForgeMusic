/**
 * The list including the names of valid filters.
 */
export enum FFMPEGFilters {
    Bassboost_low   =   "Bassboost_low",
    Bassboost       =   "Bassboost",
    Bassboost_high  =   "Bassboost_high",
    "8d"            =   "8d",
    Vaporwave       =   "Vaporwave",
    Nightcore       =   "Nightcore",
    Lofi            =   "Lofi",
    Phaser          =   "Phaser",
    Tremolo         =   "Tremolo",
    Vibrato         =   "Vibrato",
    Reverse         =   "Reverse",
    Treble          =   "Treble",
    Normalizer2     =   "Normalizer2",
    Normalizer      =   "Normalizer",
    Surrounding     =   "Surrounding",
    Pulsator        =   "Pulsator",
    Subboost        =   "Subboost",
    Karaoke         =   "Karaoke",
    Flanger         =   "Flanger",
    Gate            =   "Gate",
    Haas            =   "Haas",
    Mcompand        =   "Mcompand",
    Mono            =   "Mono",
    Mstlr           =   "Mstlr",
    Mstrr           =   "Mstrr",
    Compressor      =   "Compressor",
    Expander        =   "Expander",
    Softlimiter     =   "Softlimiter",
    Chorus          =   "Chorus",
    Chorus2d        =   "Chorus2d",
    Chorus3d        =   "Chorus3d",
    Fadein          =   "Fadein",
    Dim             =   "Dim",
    Earrape         =   "Earrape",
    Silenceremove   =   "Silenceremove"
}

/**
 * Capture pattern for song placeholders.
 */
export const PLACEHOLDER_PATTERN = /\{[a-zA-Z0-9._]+(?:\.[a-zA-Z0-9._]+)*\}/g