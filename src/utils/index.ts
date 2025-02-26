
function ignoreFilterFunc(key: PropertyKey, value: any) {
    return value === null || value == undefined;
}

export function copyProperties<T extends Record<string, any> = any>(source: T, ignoreFilter: (key: PropertyKey, value: any) => boolean = ignoreFilterFunc): T {
    const result = {} as T;
    if (source !== null && typeof source === 'object') {
        Object.keys(source).forEach(key => {
            const val = source[key]
            if (!ignoreFilter(key, val)) {
                Reflect.defineProperty(result, key, {
                    value: val,
                    enumerable: true
                })
            }
        });
    }
    return result;
}