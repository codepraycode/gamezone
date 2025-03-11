export const isEmpty = (value: unknown): boolean => {
    if (value == null) return true; // Covers null and undefined
    if (typeof value === "string") return value.trim().length === 0;
    if (typeof value === "number") return isNaN(value); // NaN is considered empty
    if (typeof value === "boolean") return false; // true/false are not empty
    if (Array.isArray(value)) return value.length === 0;
    if (value instanceof Map || value instanceof Set) return value.size === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    
    return false; // For other types (functions, symbols, non-empty objects)
};

export async function wait(time: number) {
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res(null);
        }, time * 1000)
    })
}
