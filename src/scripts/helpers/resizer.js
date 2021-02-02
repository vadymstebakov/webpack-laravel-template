import { debounce } from '@helpers/utils';

const resized = emitter => {
    return () => {
        emitter.emit('page:resized', [document.documentElement.clientWidth, document.documentElement.clientHeight]);
    };
};

export const resizer = options => {
    const fn = debounce(resized(options.emitter));

    window.addEventListener('resize', fn, options.ms, false);

    return {
        destroy() {
            window.removeEventListener('resize', fn);
        },
    };
};
