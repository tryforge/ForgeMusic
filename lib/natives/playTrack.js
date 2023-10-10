"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const naoko_player_1 = require("naoko-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$playTrack",
    description: "Instructs the Audio player to play provided track's encoded id",
    version: 'v0.0.1',
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "track encoded id",
            description: "The track's encoded id",
            type: forgescript_1.ArgType.String,
            rest: false,
            required: true,
            check: (i) => naoko_player_1.Providers.Provider.cache.has(i)
        }
    ],
    async execute(ctx, [encodedId]) {
        const track = naoko_player_1.Providers.Provider.cache.get(encodedId);
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        node.playTrack(track);
        return forgescript_1.Return.success(true);
    }
});
