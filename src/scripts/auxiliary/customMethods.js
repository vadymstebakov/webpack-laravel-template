export const asyncForEach = (arr, cb, delay = 0) => {
    arr.forEach((item, index, array) => {
        setTimeout(cb, delay, [item, index, array]);
    });
};

export const debounce = (cb, interval) => {
    let debounceTimeoutId;

    return function(...args) {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => cb.apply(this, args), interval);
    };
};

export const throttle = (cb, delay) => {
    let lastCall = 0;

    return function(...args) {
        const now = new Date().getTime();

        if (now - lastCall < delay) return;

        lastCall = now;
        return cb(...args);
    };
};

export const rAF = cb => {
    let globalID;
    let ticking = false;

    return function(...args) {
        if (!ticking) {
            cancelAnimationFrame(globalID);
            globalID = requestAnimationFrame(() => {
                ticking = false;
                return cb(...args);
            });
            ticking = true;
        }
    };
};

export const prependChild = (parent, child) =>
    parent.insertBefore(child, parent.firstElementChild);
