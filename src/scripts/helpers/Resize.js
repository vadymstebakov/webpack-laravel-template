import { debounce } from '@helpers/utils';

export default class Resize {
    static _resized() {
        return () => {
            // call your functions
        };
    }

    static init() {
        window.addEventListener('resize', debounce(Resize._resized(), 50), false);
    }
}
