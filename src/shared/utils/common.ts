export function isLocal(): boolean {
    return ['localhost', '127.0.0.1'].includes(location.hostname);
}
