import { ArgType, ErrorType, ForgeError, NativeFunction, Return, ReturnType } from "forgescript";
import { decode, encode } from "../../utils/constants";
import { SoundTrack } from "../../utils";

export default new NativeFunction({
    name: "$songSearch",
    description: "Request harmony to search for songs from source",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "searchQuery",
            description: "A query string for searching related tracks",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "sourceName",
            description: "Preferred source name to use for search",
            rest: false,
            required: false,
            type: ArgType.String
        }
    ],
    async execute(ctx, [searchQuery, sourceName]) {
        const harmony = ctx.client.music.harmony;
        const source = ! sourceName ? harmony["findQuerySource"](searchQuery)
            : Array.from(harmony.harmonySource.entries()).find(
                ([key, source]) => 
                key.toLowerCase().startsWith(sourceName.toLowerCase())
            )?.[1];
        
        if (! source) return new Return(
            ReturnType.Error,
            new ForgeError(this, ErrorType.Custom, `no source.`)
        );

        const result = await harmony.search(searchQuery, source) || [];
        return new Return(
            ReturnType.Success, 
            result.map(x => encode(<SoundTrack>x)
        ).join(","));
    }
})