import { AudioSoundMetadata } from "../../utils";

export type SoundcloudSearchType = "tracks" | "sounds" | "albums" | "users" | "playlists" | "sets";

export interface SoundcloudTrack extends AudioSoundMetadata {
    artwork_url: string;
    caption: unknown;
    commentable: boolean;
    comment_count: number;
    created_at: string;
    description: string;
    downloadable: boolean;
    download_count: number;
    duration: number;
    full_duration: number;
    embeddable_by: "all";
    genre: string;
    has_downloads_left: boolean;
    id: number;
    kind: "track";
    label_name: unknown;
    last_modified: string;
    license: string;
    likes_count: number;
    permalink: string;
    permalink_url: string;
    playback_count: number;
    public: boolean;
    publisher_metadata: SoundcloudPublisherMetadata | null;
    purchase_title: unknown;
    purchase_url: unknown;
    release_date: string;
    reposts_count: number;
    secret_token: unknown;
    sharing: string;
    state: "finished";
    streamable: boolean;
    tag_list: string;
    title: string;
    track_format: "single-track";
    uri: string;
    urn: string;
    user_id: number;
    visuals: unknown;
    waveform_url: string;
    display_date: string;
    media: { transcodings: SoundcloudMediaTranscoding[]; };
    station_urn: string;
    station_permalink: string;
    track_authorization: string;
    monetization_model: string;
    policy: 'ALLOW';
    user: SoundcloudUser;
}

export interface SoundcloudMediaTranscoding {
    url: string;
    preset: "mp3_1_0" | "mp3_0_0" | "opus_0_0";
    duration: number;
    snipped: boolean;
    format: {
        protocol: "hls" | "progressive";
        mime_type: "audio/mpeg" | "audio/ogg; codecs=\"opus\"";
    };
    quality: "sq"
}

export interface SoundcloudUser {
    avatar_url: string;
    first_name: string;
    followers_count: number;
    full_name: string;
    id: number;
    kind: "user";
    last_modified: string;
    last_name: string;
    permalink: string;
    permalink_url: string;
    uri: string;
    urn: string;
    username: string;
    verified: boolean;
    city: string;
    country_code: string;
    badges: {
        pro: boolean;
        pro_unlimited: boolean;
        verified: boolean;
    };
    station_urn: string;
    station_permalink: string;
}

export interface SoundcloudPublisherMetadata {
    id: number;
    urn: string;
    artist: string;
    contains_music: boolean;
    publisher: string;
    writer_composer: string;
}

export type SoundcloudCollectionDataType = SoundcloudTrack | SoundcloudUser;
export interface SoundcloudSearchCollection<T extends SoundcloudCollectionDataType = SoundcloudCollectionDataType> {
    collection: T[];
    total_results: number;
    next_href: string;
    query_urn: string;
}

export interface SoundcloudPlaylists {
    artwork_url: string;
    created_at: string;
    description: string;
    duration: number;
    embeddable_by: string;
    genre: string;
    id: number;
    kind: "playlist";
    label_name: string;
    last_modified: string;
    license: string;
    likes_count: number;
    managed_by_feeds: boolean;
    permalink: string;
    permalink_url: string;
    public: boolean;
    purchase_title: unknown;
    purchase_url: unknown;
    release_date: string;
    reposts_count: number;
    secret_token: unknown;
    sharing: string;
    tag_list: string;
    title: string;
    uri: string;
    user_id: number;
    set_type: string;
    is_album: boolean;
    published_at: string;
    display_date: string;
    user: SoundcloudUser;
    tracks: SoundcloudTrack[];
}