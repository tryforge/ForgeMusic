import { ArgType, NativeFunction, Return } from "forgescript";
import { Providers } from "naoko-player";

export default new NativeFunction({
    name: "$playTrack",
    description: "Instructs the Audio player to play provided track's encoded id",
    version: 'v0.0.1',
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "track encoded id",
            description: "The track's encoded id",
            type: ArgType.String,
            rest: false,
            required: true,
            check: (i: string) => Providers.Provider.cache.has(i)
        }
    ],
    async execute(ctx, [encodedId]) {
        const track = Providers.Provider.cache.get(encodedId);
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        node.playTrack(track);

        return Return.success(true);
    }
});