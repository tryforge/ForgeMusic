import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";
import { decode } from "../../utils/constants";

export default new NativeFunction({
    name: "$playSong",
    description: "Request the AudioPlayer with id to play the encoded soundtrack. Returns a boolean if it is successful.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "playerId",
            description: "The assigned id of AudioPlayer instance",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "encoded",
            description: "The encoded string of soundtrack",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [playerId, encoded]) {
        try {
            const harmony = ctx.client.music.harmony
            const player = harmony.harmonyNodes.get(playerId);
            const track = decode(encoded);

            if (! (player && track))
                return new Return(ReturnType.Success, false);
            player.playSong(track);
            return new Return(ReturnType.Success, true);
        } catch {
            return new Return(ReturnType.Success, false);
        }
    }
})