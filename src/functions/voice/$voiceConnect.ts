import { joinVoiceChannel } from "@discordjs/voice"
import type { GuildChannel, VoiceChannel } from "discord.js"
import { NativeFunction, ArgType, ErrorType } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$voiceConnect",
    description: "",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "voiceChannel",
            description: "A voice channel for the client to connect",
            type: ArgType.Channel,
            rest: false,
            required: true,
            check: (i: GuildChannel) => i.isVoiceBased()
        },
        {
            name: "errorIfFail",
            description: "Throws error if the client failed to join the voice channel. \nOtherwise it will return a boolean. \nDefaults to true",
            rest: false,
            required: false,
            type: ArgType.Boolean
        }
    ],
    async execute(context, [c, strict = true]) {
        const voiceChannel = c as VoiceChannel
        
        if (! voiceChannel.joinable) {
            if (! strict) return this.success("false")
            return this.error(ErrorType.Custom, `VoiceChannel is not joinable for client!`)
        }
        
        return this.success("")
    }
})