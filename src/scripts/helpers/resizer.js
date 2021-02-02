import { debounce } from '@helpers/utils';

const resized = emitter => {
    return () => {
        emitter.emit('page:resized', [document.documentElement.clientWidth, document.documentElement.clientHeight]);
    };
};

export const resizer = options => {
    const fn = debounce(resized(options.emitter), options.ms);

    window.addEventListener('resize', fn, false);

    return () => {
        window.removeEventListener('resize', fn);
    };
};
