import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$seekTrack',
    version: '1.0.0',
    description: 'Seeks a track.',
    brackets: true,
    unwrap: true,
    args: [Arg.requiredTime('Duration', 'Seek duration to be applied.')],
    output: ArgType.Boolean,
    async execute(ctx, [duration]) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(await queue.node.seek(duration))
    },
})
