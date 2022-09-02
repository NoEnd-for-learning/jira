export function useLocalStorageState(key: any, defaultValue?: string, { serialize, deserialize }?: {
    serialize?: {
        (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
        (value: any, replacer?: React.Key[] | null | undefined, space?: string | number | undefined): string;
    } | undefined;
    deserialize?: ((text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any) | undefined;
}): any[];
import React from "react";
