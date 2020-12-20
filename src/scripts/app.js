import { EventEmitter } from '@helpers/EventEmitter';
import SymbolSprite from '@components/UI/SymbolSprite';
import Popups from '@components/UI/Popups';
import Resize from '@helpers/Resize';
// import json from '@assets/json.json';
import { sleep } from './helpers/utils';

// console.log(json);
console.log($('div'));
const emitter = new EventEmitter();

// Init symbol sprite
SymbolSprite.init('./../images/symbol-sprite/symbol-sprite.html', 24);

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
Resize.init(emitter);
