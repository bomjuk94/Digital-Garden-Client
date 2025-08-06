export const getTimeRemaining = (timestamp: number): { label: string; diff: number } => {
    const now = Date.now()
    const diff = timestamp - now

    const seconds = Math.floor((diff / 1000) % 60)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24)
    const days = Math.floor(diff / 1000 / 60 / 60 / 24)

    let label = 'Ready'
    if (diff > 0) {
        if (days > 0) label = `${days}d ${hours}h left`
        else if (hours > 0) label = `${hours}h ${minutes}m left`
        else if (minutes > 0) label = `${minutes}m ${seconds}s left`
        else label = `${seconds}s left`
    }

    return { label, diff }
}
