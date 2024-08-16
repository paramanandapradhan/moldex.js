export function createRefererStore(initial: string = '') {
    let _referer: string = $state('');

    return {
        get referer() {
            return _referer
        },
        set referer(value: string) {
            _referer = value;
        }
    }
}