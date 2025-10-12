export function createRefererStore(initial = '') {
    let _referer = $state('');
    return {
        get referer() {
            return _referer;
        },
        set referer(value) {
            _referer = value;
        }
    };
}
