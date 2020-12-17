class StoryScreen extends HTMLElement {
    constructor() {
        super()
        this._shadow = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this._shadow.innerHTML = `
        <story-header> </story-header>
        <create-post></create-post>
        <list-post></list-post>
        `   
}
}
window.customElements.define('story-screen', StoryScreen)