"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String
        }
    ],
    async execute(ctx, [provider]) {
        ctx.setEnvironmentKey('music_default_prov', provider);
        return forgescript_1.Return.success();
    }
});
