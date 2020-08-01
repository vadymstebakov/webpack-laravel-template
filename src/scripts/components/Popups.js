import { hiddenScroll, visibleScroll } from '@helpers/utils';

export default class Popups {
    static init(popups) {
        window.addEventListener('load', () => {
            [...popups].forEach(popup => {
                popup.removeAttribute('style');
            });
        });

        document.body.addEventListener('click', e => Popups._delegation(e));
    }

    static _delegation(e) {
        let target = e.target;

        if (target.correspondingUseElement) {
            target = target.correspondingUseElement;
        }

        const el =
            target.closest('.js-popup-btn') || target.closest('.popup__overlay') || target.closest('.js-popup-close');

        if (!el) return;

        e.preventDefault();
        const openedPopup = document.querySelector('.js-popup-open');

        if (el.classList.contains('js-popup-close') || el.classList.contains('popup__overlay')) {
            visibleScroll();

            openedPopup && openedPopup.classList.remove('js-popup-open');
        } else if (el.classList.contains('js-popup-btn')) {
            hiddenScroll();

            document.getElementById(`${el.dataset.popup}`).classList.add('js-popup-open');
        }
    }
}
