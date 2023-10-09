import { ArgType, NativeFunction, Return } from "forgescript";

export default new NativeFunction({
    name: "$defaultProvider",
    description: "Changes default music provider for the current environment",
    version: "v0.0.1",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "provider",
            description: "The provider name or prefix",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    async execute(ctx, [provider]) {
        ctx.setEnvironmentKey('music_default_prov', provider);
        return Return.success();
    }
})