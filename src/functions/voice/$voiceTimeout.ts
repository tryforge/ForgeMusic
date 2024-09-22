import { NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$voiceTimeout",
    description: "A timeout configuration for the client to leave the voice channel.",
    unwrap: true,
    brackets: true,
    args: [],
    async execute(context) {
        return this.success("")
    }
})