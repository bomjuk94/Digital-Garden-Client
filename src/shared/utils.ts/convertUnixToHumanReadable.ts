export const convertUnix = (timestamp: number, timeIncluded?: boolean) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...(timeIncluded && {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }),
    });
}
