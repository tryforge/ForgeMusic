enum AudioNodeEvents {
    ConnectionAdded = "connectionAdded"
}

interface AudioTrack<Metadata = unknown> {
    title: string;
    identifier: string;
    sourceName: string;
    author: string;
    authorId: string;
    artworkId: string;
    isStream: boolean;
    duration: number;
    [x: string]: string | number | boolean | Metadata;
}

interface LoadTracksResult {
    /** The results of load tracks from search */
    collection: AudioTrack[];
    /** The passed limit from params, if the value is not provided by default sets to (-1) */
    limit: number;
    /** The passed offset from params, if the value is not provided by default sets to (0) */
    offset: number;

    /**
     * - Type of "playlist" is for results that is using a playlist url.
     * - Type of "search" is for default searching.
     * - Type of "track" is for query's that reference a track.
     */
    type: "playlist" | "track" | "search"
    /** The playlist name, if type is not playlist by defautlt sets to ("") */
    title: string;
    /** The playlist description, if type is not playlist by defautlt sets to ("") */
    description: string;
    /** The playlist author urn, if type is not playlist by defautlt sets to ("") */
    author: string;
    /** The amount of tracks is collected from search results */
    countResults: number;
}

export {
    AudioNodeEvents,
    AudioTrack,
    LoadTracksResult
}