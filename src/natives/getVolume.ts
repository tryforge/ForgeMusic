import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$getVolume',
    version: '1.0.0',
    description: 'Get the current volume of the music player.',
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        return this.success(queue.node.volume)
    },
})
