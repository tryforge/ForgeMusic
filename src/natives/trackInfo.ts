import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$trackInfo",
    version: "1.0.0",
    description: "Returns information of the current track.",
    brackets: true,
    unwrap: true,
    args: [
        Arg.restString("Properties", "The track properties to be accesed.")
    ],
    output: ArgType.String,
    execute(ctx, [properties]) {
        const queue = useQueue(ctx.guild)
        const track = queue.currentTrack

        ctx.setEnvironmentKey("myTrack", track)
        const got = ctx.getEnvironmentKey(...["myTrack", ...properties])
        ctx.deleteEnvironmentKey("myTrack")

        return this.success(got)
    }
})