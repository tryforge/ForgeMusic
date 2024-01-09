import undici = require("undici");
import constants = require("./constants");
import { SoundcloudSearchCollection, SoundcloudSearchType } from "./types";
import AudioSource = require("../../structures/AudioSource");
import { noopNull } from "../../utils/constants";

interface SoundcloudOptions {
    clientId: string;
}

class Soundcloud {
    public sourceName = "soundcloud";
    public readonly web = new undici.Pool(constants.urls.web);
    public readonly mobile = new undici.Pool(constants.urls.mobile);
    public readonly api = new undici.Pool(constants.urls.v2Api);

    #clientId?: string;

    public constructor(options?: SoundcloudOptions) {
        // super();
        this.#clientId = options?.clientId;
        if (! this.#clientId) this.getClientID();
    }

    public get clientId() {
        return this.#clientId;
    }

    async #ClientIDTest() {
        const params = {
            ids: "1583262595",
            client_id: this.#clientId
        }

        const req = await this.api.request({ method: "GET", path: "/tracks", query: params });
        if (! (req && req.statusCode >= 200 && req.statusCode < 300)) return false;
        return true;
    }

    public async getClientID() {
        let text = <string>await this.getHTMLFromURL("https://m.soundcloud.com/");
        let cid = text.match(constants.regex.clientId)?.[2];
        if (cid) {
            this.#clientId = cid;
            return cid;
        }

        // Get from web
        const html =  <string>await this.getHTMLFromURL("https://soundcloud.com/");
        const crosscripts = <string>Array.from(html.matchAll(constants.regex.crossorigin)).pop()?.[1];
        const req = await undici.request(crosscripts);
        if (! ( req && req.statusCode >= 200 && req.statusCode < 300)) return;

        text = await req.body.text();
        cid = text.match(constants.regex.clientId)?.[2];
        if (cid) {
            this.#clientId = cid;
            return cid;
        }
    }

    public getHTMLFromURL(url: string | URL) {
        if (! (url instanceof URL)) url = new URL(url);
        
        const dispatcher = this.#getLinkDispatcher(url);
        return dispatcher.request({
            method: "GET",
            path: url.pathname,
            query: this.#URLParamsToObject(url.searchParams)
        }).then((perv) => perv.body.text()).catch(noopNull);
    }

    public async search(query: string, type?: SoundcloudSearchType, limit = 20, offset = 0) {
        let t: string = "";
        switch (type) {
            case "tracks":
            case "sounds":
                t = "tracks";
                break;
            case "users":
                t = "users";
                break;
            case "albums":
                t = "albums";
                break;
            case "playlists":
            case "sets":
                t = "playlists_without_albums";
                break;
        }

        const req = await this.api.request({
            method: "GET",
            path: "/search" + (t ? `/${t}` : ""),
            query: {
                q: query,
                client_id: this.#clientId
            }
        });

        if (! ( req && req.statusCode >= 200 && req.statusCode < 300)) return null;
        return <SoundcloudSearchCollection>await req.body.json();
    }

    #URLParamsToObject(params: URLSearchParams) {
        const obj: Record<string, any> = {};
        for (const [key, value] of params.entries()) {
            if (Array.isArray(obj[key])) {
                (<Array<string>>obj[key]).push(value);
                continue;
            }
            if (obj[key]) {
                obj[key] = [obj[key], value];
                continue;
            }

            obj[key] = value;
        }
        return obj;
    }

    #getLinkDispatcher(url: URL) {
        if (url.host.startsWith("m.soundcloud"))
            return this.mobile;
        return this.web;
    }

    public buildFromData() {

    }
}

export = Soundcloud;