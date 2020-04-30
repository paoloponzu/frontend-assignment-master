import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
    id: string;
    name: string;
    types: string[];
    classification: String;
}

const SIZE = 10;

export function query(args: {
    type?: string;
    limit?: number;
    after?: string;
}): Connection<Pokemon> {
    const { type, limit = SIZE, after } = args;

    const filterByType: (as: Pokemon[]) => Pokemon[] =
        type === undefined
            ? identity
            : A.filter(p => {
                var regex = new RegExp(p.types.join("|").toLowerCase(), "i");
                return regex.test(type.toLowerCase());
            });

    const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
        // filter only if q is defined
        after === undefined
            ? identity
            : as =>
                pipe(
                    as,
                    A.findIndex(a => a.id === after),
                    O.map(a => a + 1),
                    O.fold(() => as, idx => as.slice(idx))
                );

    const results: Pokemon[] = pipe(
        data,
        filterByType,
        sliceByAfter,
        // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
        slice(0, limit + 1)
    );
    return toConnection(results, limit, type);
}
