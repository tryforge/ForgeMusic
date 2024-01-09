import { SoundcloudSearchType } from "./types";

const urls = {
    web: "https://soundcloud.com/",
    mobile: "https://m.soundcloud.com/",
    publicApi: "https://api.soundcloud.com/",
    v2Api: "https://api-v2.soundcloud.com/",
    mobileApi: "https://api-mobi.soundcloud.com/"
}

const regex = {
    clientId: /(client_id|"clientId"):"([^"]+)/,
    mobileVersion: /"buildVersion":"([^"]+)/,
    webVersion: /__sc_version = "([^"]+)/,
    crossorigin: /<script crossorigin src="([^"]+)/g
}

class SoundcloudURLMetadata {
    public readonly url: URL;
    public constructor(url: string | URL) {
        if (! ( url instanceof URL)) url = new URL(url);
        this.url = url;
    }

    public isSoundcloud() {
        return this.url.host === "soundcloud.com" || this.url.host === "m.soundcloud.com";
    }

    public isDiscoverURL() {
        return this.url.pathname === "/discover";
    }

    public isSearchURL(type?: SoundcloudSearchType) {
        if (! type) return this.url.pathname === "/search";
        
        switch (type) {
            case "tracks":
            case "sounds":
                return this.url.pathname === "/search/sounds";
            case "albums":
                return this.url.pathname === "/search/albums";
            case "playlists":
            case "sets":
                return this.url.pathname === "/search/sets";
            case "users":
                return this.url.pathname === "/search/users";
            default: return null;
        }
    }
}

export {
    urls,
    regex,
    SoundcloudURLMetadata
}