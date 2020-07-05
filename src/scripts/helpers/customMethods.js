export const asyncForEach = (arr, cb, delay = 0) => {
    arr.forEach((item, index, array) => {
        setTimeout(cb, delay, [item, index, array]);
    });
};

export const debounce = (cb, interval = 0) => {
    let debounceTimeoutId;

    return function (...args) {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = null;
        debounceTimeoutId = setTimeout(() => cb.apply(null, [...args]), interval);
    };
};

export const throttle = (cb, delay) => {
    let lastCall = 0;

    return function (...args) {
        const now = new Date().getTime();

        if (now - lastCall < delay) return;

        lastCall = now;
        return cb(...args);
    };
};

export const rAF = cb => {
    let globalID;
    let ticking = false;

    return function (...args) {
        if (!ticking) {
            cancelAnimationFrame(globalID);
            globalID = null;
            globalID = requestAnimationFrame(() => {
                ticking = false;
                return cb(...args);
            });
            ticking = true;
        }
    };
};

export const prependChild = (parent, child) => parent.insertBefore(child, parent.firstElementChild);

export const getScrollbarWidth = () => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
};

export const hiddenScroll = () => {
    const scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;

    document.documentElement.classList.add('no-scroll');
    document.documentElement.style.top = `${-scrollTop}px`;
};

export const visibleScroll = () => {
    const scrollTop = parseInt(document.documentElement.style.top);

    document.documentElement.classList.remove('no-scroll');
    document.documentElement.style.removeProperty('top');
    document.documentElement.scrollTop = -scrollTop;
    document.body.scrollTop = -scrollTop;
};
