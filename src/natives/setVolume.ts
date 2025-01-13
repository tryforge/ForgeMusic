import { Arg, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$setVolume",
    version: "1.0.0",
    description: "Set the volume of the music player.",
    brackets: true,
    unwrap: true,
    args: [Arg.requiredNumber("Amount", "The volume amount to be applied.")],
    execute(ctx, [amount]) {
        getNode(ctx).setVolume(amount)

        return this.success()
    }
})