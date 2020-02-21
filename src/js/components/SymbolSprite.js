export default class SymbolSprite {
	static inject(path) {
		if (
			!document.createElementNS ||
			!document.createElementNS('http://www.w3.org/2000/svg', 'svg')
				.createSVGRect
		)
			return true;

		let revision = 1;
		let isLocalStorage =
			'localStorage' in window && window['localStorage'] !== null;
		let data;

		const insertIT = () => document.body.insertAdjacentHTML('afterbegin', data);

		const insert = () =>
			document.body
				? insertIT()
				: document.addEventListener('DOMContentLoaded', insertIT);

		if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
			data = localStorage.getItem('inlineSVGdata');
			if (data) {
				insert();
				return true;
			}
		}

		try {
			const request = new XMLHttpRequest();
			request.open('GET', path);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					data = request.responseText;
					insert();
					if (isLocalStorage) {
						localStorage.setItem('inlineSVGdata', data);
						localStorage.setItem('inlineSVGrev', revision);
					}
				}
			};

			request.send();
		} catch (e) {
			alert(`Error: ${e}`);
		}
	}
}
