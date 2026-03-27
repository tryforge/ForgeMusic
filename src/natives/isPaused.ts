import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$isPaused',
    version: '1.0.0',
    description: 'Check whether the music player is paused.',
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(queue.node.isPaused())
    },
})
