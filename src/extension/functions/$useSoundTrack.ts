import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";
import AudioPlayerNode = require("../../structures/AudioPlayerNode");
import { decode } from "../../utils/constants";

export default new NativeFunction({
    name: "$useSoundTrack",
    description: "Decodes Soundtrack for the use of utility functions for displaying soundtrack metadata. Returns if the function is able to decode the encoded soundtrack.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "encoded",
            description: "The encoded string of soundtrack",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [encoded]) {
        try {
            const track = decode(encoded);
            ctx.setEnvironmentKey("track", track);
            return new Return(ReturnType.Success, true);
        } catch {
            return new Return(ReturnType.Success, false);
        }
        
    }
})