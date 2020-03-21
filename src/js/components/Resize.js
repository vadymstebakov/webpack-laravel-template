import {debounce} from './customMethods';

export default class Resize {
    static _resized() {
        // call your functions
    }

    static init() {
        window.addEventListener('resize', debounce(Resize._resized, 50), false);
    }
}
