// import * as $ from 'jquery';
import SymbolSprite from '@components/SymbolSprite';
import Popups from '@components/Popups';
import Resize from '@components/Resize';
// import json from '@assets/json.json';

// Init symbol sprite
SymbolSprite.init('./../images/symbol-sprite/symbol-sprite.html', 24);

// Popups
{
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        Popups.init(popups);
    }
}

// Resize function
Resize.init();
