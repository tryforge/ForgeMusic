import { ArgType, NativeFunction, Return } from "forgescript";
import { Providers } from "naoko-player";

export default new NativeFunction({
    name: "$getTrackInfo",
    description: "Returns record information from specified track",
    version: "v0.0.1",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "track encoded id",
            description: "The track encoded id",
            type: ArgType.String,
            rest: false,
            required: true,
            check: (i: string) => Providers.Provider.cache.has(i)
        },
        {
            name: "track key info",
            description: "The track metadata information from key",
            type: ArgType.String,
            rest: false,
            required: true
        }
    ],
    async execute(ctx, [encodedId, recordKey]) {
        const track = Providers.Provider.cache.get(encodedId);
        return Return.success(track[recordKey] ?? 'None');
    }
})