import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$resumeTrack',
    version: '1.0.0',
    description: 'Resumes the current paused track.',
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(queue.node.resume())
    },
})
