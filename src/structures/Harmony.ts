import HarmonyPlayer = require("./HarmonyPlayer");
import SourceExtension = require("./SourceExtension");

const CACHE_BEHAVIOR = ["eager", "lazy", "none"];
const PLAY_BEHAVIOR = ["async", "defer"];

type CacheBehaviorMode = "eager" | "lazy" | "none"
interface HarmonyOptions<CacheMode extends CacheBehaviorMode = "none"> {
    cacheBehavior: CacheMode;
    playBehavior: "async" | "defer";
}
class Harmony {
    public readonly harmonyNodes = new Map<string, HarmonyPlayer>();
    public readonly harmonySource = new Map<string, SourceExtension>();
    public readonly options: Readonly<HarmonyOptions<CacheBehaviorMode>>;
    private readonly harmonySourceNames = new Map<string, string>();

    public constructor(options?: HarmonyOptions<CacheBehaviorMode>) {
        this.options = this.buildHarmonyOptions(options);
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
            console.warn(`Called \`registerSource\` but similar source of instance ${name} is already registered.`);
            if (! forceRegister) return;
            console.log(`Forced Register is enabled. Registering similar instance of ${name}`);
        }

        const id = name + "_" + Date.now().toString(36);
        this.harmonySource.set(id, source);
        console.debug(`Registered source ${name} with id of "${id}"`);
    }

    public createAudioPlayer(id: string) {
        if (this.harmonyNodes.has(id))
            throw new Error(`Attempt to register an audio player with id, but one already exist!`);
        
    }
}

export = Harmony;