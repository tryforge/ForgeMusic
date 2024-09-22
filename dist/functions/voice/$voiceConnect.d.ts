import type { GuildChannel } from "discord.js";
import { NativeFunction, ArgType } from "@tryforge/forgescript";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Channel;
    rest: false;
    required: true;
    check: (i: GuildChannel) => i is import("discord.js").VoiceBasedChannel;
}, {
    name: string;
    description: string;
    rest: false;
    required: false;
    type: ArgType.Boolean;
}], true>;
export default _default;
