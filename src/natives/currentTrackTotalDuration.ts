import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$currentTrackTotalDuration',
    version: '1.0.0',
    description: 'Returns the total duration of the current audio track.',
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(queue.currentTrack.durationMS)
    },
})
