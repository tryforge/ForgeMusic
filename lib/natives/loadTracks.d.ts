import { ArgType, NativeFunction } from "forgescript";
import { enums } from "naoko-player";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    rest: false;
    required: true;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof enums.LoadResultType;
    rest: false;
    required: true;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    rest: false;
    required: false;
}], true>;
export default _default;
