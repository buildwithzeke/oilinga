export type QueryValue = string | string[] | undefined;

/** Next search params can repeat, so always read the first value. */
export function first(value: QueryValue) {
    return Array.isArray(value) ? value[0] : value;
}

/** Build a URL while dropping empty values. */
export function buildHref(
    basePath: string,
    query: Record<string, string | number | undefined>,
) {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== "") params.set(key, String(value));
    });

    const search = params.toString();
    return search ? `${basePath}?${search}` : basePath;
}

export function parseNumber(value: QueryValue) {
    const raw = first(value);
    if (!raw) return undefined;
    const numeric = Number(raw.replace(/[^\d.]/g, ""));
    return Number.isFinite(numeric) && numeric >= 0 ? numeric : undefined;
}
