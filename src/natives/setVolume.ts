import { Arg, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$setVolume',
    version: '1.0.0',
    description: 'Set the volume of the music player.',
    brackets: true,
    unwrap: true,
    args: [Arg.requiredNumber('Amount', 'The volume amount to be applied.')],
    execute(ctx, [amount]) {
        const queue = useQueue(ctx.guild.id)
        if (!queue) return this.customError('No queue found.')

        queue.node.setVolume(amount)

        return this.success()
    },
})
