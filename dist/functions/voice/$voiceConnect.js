"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$voiceConnect",
    description: "",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "voiceChannel",
            description: "A voice channel for the client to connect",
            type: forgescript_1.ArgType.Channel,
            rest: false,
            required: true,
            check: (i) => i.isVoiceBased()
        },
        {
            name: "errorIfFail",
            description: "Throws error if the client failed to join the voice channel. \nOtherwise it will return a boolean. \nDefaults to true",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.Boolean
        }
    ],
    async execute(context, [c, strict = true]) {
        const voiceChannel = c;
        if (!voiceChannel.joinable) {
            if (!strict)
                return this.success("false");
            return this.error(forgescript_1.ErrorType.Custom, `VoiceChannel is not joinable for client!`);
        }
        const con = (0, voice_1.joinVoiceChannel)({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guildId,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });
        return this.success("");
    }
});
