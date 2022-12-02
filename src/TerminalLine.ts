export default class TerminalLine extends HTMLElement {
	public text: string = "TermX ~"
	public input: string

	constructor(text?: string) {
		super()
		if (text == undefined) {
			text = "TermX ~"
		}
		this.text = text
		this.innerHTML = this.text
	}
}

customElements.define('terminal-line', TerminalLine)