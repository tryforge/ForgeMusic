import { ForgeMusic } from '@structures/ForgeMusic'
import { Arg, NativeFunction } from '@tryforge/forgescript'
import { useQueue } from 'discord-player'

export default new NativeFunction({
    name: '$findExtractor',
    version: '1.0.0',
    description: 'Find an extractor by name.',
    brackets: true,
    unwrap: true,
    args: [Arg.requiredString('Name', 'The name of the extractor to find.')],
    async execute(ctx, [query]) {
        const globalPlayer = ctx.getExtension(ForgeMusic).player
        if (!globalPlayer)
            return this.customError('Unable to find an instance of player!')

        const extractors = Array.from(globalPlayer.extractors.store.values())
        let result: string

        result = extractors.find(
            (ex) =>
                ex.identifier.toLowerCase().includes(query.toLowerCase()) ||
                ex.constructor.name.toLowerCase().includes(query.toLowerCase())
        )?.identifier

        return this.success(result)
    },
})
