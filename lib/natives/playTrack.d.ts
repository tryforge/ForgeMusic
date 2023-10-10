import { ArgType, NativeFunction } from "forgescript";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    rest: false;
    required: true;
    check: (i: string) => boolean;
}], true>;
export default _default;
