import { debounce } from '@helpers/utils';

export default class Resize {
    static _resized(emitter) {
        return () => {
            emitter.emit('page:resized', [document.documentElement.clientWidth, document.documentElement.clientHeight]);
        };
    }

    static init(emitter) {
        window.addEventListener('resize', debounce(Resize._resized(emitter), 50), false);
    }
}
