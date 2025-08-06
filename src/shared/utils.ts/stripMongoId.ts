export const stripMongoId = (data: any, key?: string): any => {
    if (!data) return Array.isArray(data) ? [] : {};

    if (key && data[key]) {
        return stripMongoId(data[key]);
    }

    if (Array.isArray(data)) {
        return data.map(({ _id, ...rest }) => rest);
    }

    if (typeof data === "object") {
        const { _id, ...rest } = data;
        return Object.fromEntries(
            Object.entries(rest).map(([k, v]) => [
                k,
                Array.isArray(v)
                    ? v.map(({ _id, ...innerRest }) => innerRest)
                    : v,
            ])
        );
    }

    return data;
};
