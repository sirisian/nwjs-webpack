import 'construct-style-sheets-polyfill';
import uiComponentStyle from './uicomponent.css' assert { type: "css" }; // I use this to return a CSSStyleSheet with a webpack rule. I know, weird.

export default class UIComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.adoptedStyleSheets = [uiComponentStyle];
		this.shadowRoot.appendChild(
			this.$slot = document.createElement('slot')
		);
	}
}

customElements.define('ui-component', UIComponent);