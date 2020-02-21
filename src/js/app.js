import SymbolSprite from './components/SymbolSprite';
import json from '../assets/json.json';

console.log(json);

// Inject symbol sprite
SymbolSprite.inject('./../images/symbol-sprite/symbol-sprite.html');

// Resize function
(function fnResize() {
	let doit;

	function resized() {}

	window.onresize = () => {
		clearTimeout(doit);
		doit = setTimeout(resized, 50);
	};
})();
