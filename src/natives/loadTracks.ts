import { ArgType, NativeFunction, Return } from "forgescript";
import { Providers, enums } from "naoko-player";

export default new NativeFunction({
    name: "$loadTracks",
    description: "Loads and search tracks from provider. Returns an array of encoded id's",
    version: "v0.0.1",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "query",
            description: "The query string for searching tracks",
            type: ArgType.String,
            rest: false,
            required: true
        },
        {
            name: "loadType",
            description: "The load result type for filtering items",
            type: ArgType.Enum,
            enum: enums.LoadResultType,
            rest: false,
            required: true
        },
        {
            name: "provider",
            description: "The provider which to search tracks from",
            type: ArgType.String,
            rest: false,
            required: false
        }
    ],
    async execute(ctx, [query, loadType, 
        providerName = ctx.getEnvironmentKey('music_default_prov') || 
        ctx.client.music.options.defaultProvider]) {

        const provider = ctx.client.music.manager.providers.get(providerName);
        return Return.success((await provider.loadTracks(query, loadType)).map(x => x['encodedId'] || x.sourceURL).join(', '));
    }
});