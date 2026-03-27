import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$skipTo',
    version: '1.0.0',
    description: 'Skip the current track to the given position.',
    brackets: true,
    unwrap: true,
    args: [Arg.requiredNumber('Position', 'The track position to be played.')],
    output: ArgType.Boolean,
    execute(ctx, [position]) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(queue.node.skipTo(position))
    },
})
