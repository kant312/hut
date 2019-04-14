import logger from './logger';

export default class Hut {

	constructor (config = {}) {
		const defaults = {
			el: '#app',
			renderer: window.document,
			tpl: '<div></div>',
			ctx: () => {},
		}

		this.config = Object.assign({}, defaults, config);
		this.renderer = this.config.renderer;
		this.el = this.renderer.querySelector(this.config.el);
		this.ctx = this.config.ctx();

		logger.log(`Init application in element ${this.config.el}`)

		this.mount(this.el, this.prepare(this.config.tpl, this.ctx));
	}

	prepare (template, context) {
		const appNode = this.renderer.createElement('div');
		const tokens = template.match(/\{\{\s?([^}]+)\}\}/).slice(1);
		const evaluatedContent = tokens.reduce( (acc, token) => {
			token = token.trim();
			return acc.replace(new RegExp(`\\{\\{\\s?${token}\\s?\\}\\}`, 'gi'), context[token]);
		}, template);
		const content = this.renderer.createTextNode(evaluatedContent);
		appNode.appendChild(content);

		return appNode;
	}

	mount (mountingNode, applicationNode) {
		return mountingNode.parentNode.replaceChild(applicationNode, mountingNode);
	}
}