import path = require("path");
import { SoundMetadata, SoundTrack } from "../utils";
import HarmonyPlayer = require("./HarmonyPlayer");
import SourceExtension = require("./SourceExtension");
import fs = require("fs");

const CACHE_BEHAVIOR = ["relation", "lazy", "none"];
const PLAY_BEHAVIOR = ["async", "defer"];

type CacheBehaviorMode = "relation" | "lazy" | "none"
interface HarmonyOptions<CacheMode extends CacheBehaviorMode = "none"> {
    cacheBehavior: CacheMode;
    playBehavior: "async" | "defer";
}
class Harmony {
    public readonly harmonyNodes = new Map<string, HarmonyPlayer>();
    public readonly harmonySource = new Map<string, SourceExtension>();
    public readonly options: Readonly<HarmonyOptions<CacheBehaviorMode>>;
    public readonly harmonyDirectory = path.join(process.cwd(), ".harmony")

    public constructor(options?: HarmonyOptions<CacheBehaviorMode>) {
        this.options = this.buildHarmonyOptions(options);

        // Cache Region
        const p = path.join(this.harmonyDirectory, "cache")
        if (fs.existsSync(p)) {
            this.clearHarmonyCache();
        }

        fs.mkdirSync(p, { recursive: true });
        fs.mkdirSync(path.join(this.harmonyDirectory, "sounds"), { recursive: true });
    }

    public clearHarmonyCache() {
        const p = path.join(this.harmonyDirectory, "cache");
        const walk = (p: string) => {
            const readdir = fs.readdirSync(p);
            for (const fname of readdir) {
                const stat = fs.statSync(path.join(p, fname));
                if (stat.isFile() && fname.endsWith(".")) fs.unlinkSync(path.join(p, fname));
                if (stat.isDirectory()) walk(p);
            }
        };
        walk(p);
    }

    protected buildHarmonyOptions(options?: HarmonyOptions<CacheBehaviorMode>) {
        const obj: HarmonyOptions<CacheBehaviorMode> = {
            playBehavior: options?.playBehavior || "async",
            cacheBehavior: options?.cacheBehavior || "none"
        };

        if (! PLAY_BEHAVIOR.includes(obj.playBehavior.toLowerCase()))
            throw new Error(`Unsupported playBehavior of ${obj.playBehavior}`);

        if (! CACHE_BEHAVIOR.includes(obj.cacheBehavior.toLowerCase()))
            throw new Error(`Unsupported cacheBehavior of ${obj.cacheBehavior}`);
        return Object.freeze(obj)
    }

    public registerSource(source: SourceExtension, forceRegister?: boolean) {
        const name = source.constructor.name;
        const similarInstance = Array.from(this.harmonySource.keys()).some(key => key.startsWith(name));
        
        if (similarInstance) {
            console.warn(`[Harmony.registerSource] Duplicate source class "${name}" attempt for register.`);
            if (! forceRegister) return;
            console.log(`[Harmony.registerSource] Force Register enabled.`);
        }

        const id = name + "_" + Date.now().toString(36);
        this.harmonySource.set(id, source);
        console.debug(`[Harmony.registerSource] Registered source ${name} with id of "${id}"`);
    }

    public createAudioPlayer(id: string) {
        if (this.harmonyNodes.has(id))
            throw new Error(`Duplicate id of another instance of registered AudioPlayer!`);
        
        const player = new HarmonyPlayer(id, this);
        this.harmonyNodes.set(id, player);
        console.debug(`Created HarmonyPlayer with id of "${id}"`);
        return player;
    }

    public async search(query: string, source?: SourceExtension) {
        const ext = source instanceof SourceExtension ? source : this.findQuerySource(query);
        if (! ext || ! ext.validateSearch(query)) 
            throw new Error(`Unable to find valid source for the following query: "${query}"`);

        return ext.search(query);
    }

    public async createAudioMetadata(track: SoundTrack): Promise<SoundMetadata | null> {
        const source = this.findTrackSource(track);
        if (! source) throw new Error(`Unable to find valid source for the following track with sourceName: "${track.sourceName}"`);

        return source.createAudioMetadata(track)!
    }

    protected findTrackSource(track: SoundTrack) {
        let v: SourceExtension | undefined;
        for (const source of this.harmonySource.values()) {
            if (! source.validateTrack(track)) continue;
            v = source;
            break;
        }
        return v;
    }

    protected findQuerySource(query: string) {
        let v: SourceExtension | undefined;
        for (const source of this.harmonySource.values()) {
            if (! source.validateSearch(query)) continue;
            v = source;
            break;
        }
        return v;
    }
}

export = Harmony;