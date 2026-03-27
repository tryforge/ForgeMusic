import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$playerElapsedTime',
    version: '1.0.0',
    description:
        'Returns the elapsed time of the current song in milliseconds.',
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(queue.node.getTimestamp().progress * 1000)
    },
})
