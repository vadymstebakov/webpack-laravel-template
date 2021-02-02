import { EventEmitter } from '@helpers/EventEmitter';
import { initSymbolSprite } from '@components/ui/symbolSprite';
import Popups from '@components/ui/Popups';
import { resizer } from '@helpers/resizer';
import { sleep } from '@helpers/utils';

const emitter = new EventEmitter();

// Init symbol sprite
initSymbolSprite('./../images/symbol-sprite/symbol-sprite.html', 24);

// Popups
{
    const $popups = document.querySelectorAll('.popup');
    if ($popups.length) {
        const popups = new Popups($popups, {});
        popups.init();
    }
}

sleep(5000).then(() => {
    console.log('end');
});

// Resize function
resizer({ emitter, ms: 300 });
