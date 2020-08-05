export default class SymbolSprite {
    static init(path, hours) {
        if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
            return true;
        }
        const expirationSVGDate = new Date(new Date().getTime() + hours * 60 * 60 * 1000);
        const oldExpirationSVGDate = new Date(localStorage.getItem('expirationSVGDate'));
        const revision = 1;
        const isLocalStorage = 'localStorage' in window && window['localStorage'] !== null;
        let data;
        const insertIT = () => document.body.insertAdjacentHTML('afterbegin', data);
        const insert = () => (document.body ? insertIT() : document.addEventListener('DOMContentLoaded', insertIT));
        const clearSVGData = () => {
            localStorage.removeItem('inlineSVGData');
            localStorage.removeItem('inlineSVGRev');
            localStorage.removeItem('expirationSVGDate');
        };
        if (
            isLocalStorage &&
            Number(localStorage.getItem('inlineSVGRev')) === revision &&
            oldExpirationSVGDate >= new Date()
        ) {
            data = localStorage.getItem('inlineSVGData');
            if (data) {
                insert();
                return true;
            }
        } else {
            clearSVGData();
        }
        try {
            const request = new XMLHttpRequest();
            request.open('GET', path);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    data = request.responseText;
                    insert();
                    if (isLocalStorage) {
                        localStorage.setItem('inlineSVGData', data);
                        localStorage.setItem('inlineSVGRev', revision);
                        localStorage.setItem('expirationSVGDate', expirationSVGDate);
                    }
                }
            };
            request.send();
        } catch (e) {
            alert(`Error: ${e}`);
        }
    }
}
