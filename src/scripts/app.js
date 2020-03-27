import SymbolSprite from './components/SymbolSprite';
import json from '../assets/json.json';
import Resize from './components/Resize';

console.log(json);

// Inject symbol sprite
SymbolSprite.inject('./../images/symbol-sprite/symbol-sprite.html');

// init resize
Resize.init();
