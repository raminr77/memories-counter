import { clsx } from 'clsx';

type Mapping = Record<string, unknown>;
type Value = string | number | boolean | undefined | null;
type Argument = Value | Mapping | Array<Value | Mapping>;

type ArgumentArray = Array<Argument>;

export function classnames(...args: ArgumentArray): string {
    return clsx(...args);
}
