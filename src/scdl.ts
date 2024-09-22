import { Pool, request, stream } from "undici";

const REGEX_DesktopScript = /<script crossorigin src="([^"]+)"><\/script>/g
const REGEX_ClientId = /["]?client[_]?[iI]d["]?:\s*"([^"]+)"/

const SoundcloudHost = "https://soundcloud.com"
const Api = new Pool("https://api-v2.soundcloud.com/")
const Routes = {
    Tracks: "/tracks",
    Search: "/search",
    SearchQuery: "/search/queries"
}

const RequestHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
}

async function getKey(html?: string) {
    if (! html) {
        const response = await request(SoundcloudHost)
        html = await response.body.text()
    }

    const scripts = html.matchAll(REGEX_DesktopScript)
    if (scripts) {
        // Using desktop website
        const scriptUrl = Array.from(scripts).pop()[1]
        const requestScript = await request(scriptUrl)
        const scriptContent = await requestScript.body.text()
        const matched = scriptContent.match(REGEX_ClientId)

        if (matched) return matched[1]
    }

    // Using mobile website
    // If redirected
    const matched = html.match(REGEX_ClientId)
    if (matched) return matched[1]

    throw new Error(`Failed to get key!`)
}

const html = async (url: string) => (await request(url, { headers: RequestHeaders })).body.text()

type LibraryOptions = { clientId?: string }
class API {
    #clientId: string
    constructor(options?: LibraryOptions) {
        if (options) {
            if (typeof options.clientId === "string") 
                this.#clientId = options.clientId
        }
    }

    async getClientID() {
        const text = await html(SoundcloudHost)
        const scripts = text.matchAll(REGEX_DesktopScript)
        if (scripts != null) {
            const clientScript = await html(Array.from(scripts).pop[1])
            const matches = clientScript.match(REGEX_ClientId)
            
            if (matches != null) return matches[1]
        }

        // Check for the clientId present in web html
        const matches = text.match(REGEX_ClientId)
        if (matches != null) return matches[1]

        throw new Error(`clientId is unknown`)
    }

    [Symbol.for('nodejs.inspect.custom')]() {
        return "object SoundcloudObject"
    }
}

export const scdl = () => {

}

scdl.prototype.new = () => {

}
