customElements.define("artist-cover", class extends HTMLElement {
  static observedAttributes = ['id', 'name', 'cover']

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <a href="#artists/${this.getAttribute("id")}">
        <img src="${this.getAttribute("cover")}" />
        <div class="artist-list-item-title">${this.getAttribute("name")}</div>
      </a>
     `
  }
})
