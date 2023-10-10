"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const naoko_player_1 = require("naoko-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$getTrackInfo",
    description: "Returns record information from specified track",
    version: "v0.0.1",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "track encoded id",
            description: "The track encoded id",
            type: forgescript_1.ArgType.String,
            rest: false,
            required: true,
            check: (i) => naoko_player_1.Providers.Provider.cache.has(i)
        },
        {
            name: "track key info",
            description: "The track metadata information from key",
            type: forgescript_1.ArgType.String,
            rest: false,
            required: true
        }
    ],
    async execute(ctx, [encodedId, recordKey]) {
        const track = naoko_player_1.Providers.Provider.cache.get(encodedId);
        return forgescript_1.Return.success(track[recordKey] ?? 'None');
    }
});
