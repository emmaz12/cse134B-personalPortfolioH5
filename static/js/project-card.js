class ProjectCard extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });

        // Define the structure of the card
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: var(--card-width, 300px);
                    background: var(--card-bg, white);
                    border-radius: var(--card-border-radius, 10px);
                    box-shadow: var(--card-shadow, 2px 2px 10px rgba(0, 0, 0, 0.1));
                    padding: var(--card-padding, 16px);
                    transition: transform 0.2s ease-in-out;
                }
                :host(:hover) {
                    transform: scale(1.05);
                }
                h2 {
                    font-size: var(--card-title-size, 1.2em);
                    color: var(--card-title-color, #333);
                    margin-bottom: 8px;
                }
                picture img {
                    width: 20%;
                    border-radius: var(--card-border-radius, 10px);
                    margin: auto;
                    display: flex
                }
                p {
                    font-size: var(--card-text-size, 1em);
                    color: var(--card-text-color, #555);
                    margin: 8px 0;
                }
                a {
                    text-decoration: none;
                    color: var(--card-link-color, #007bff);
                    font-weight: bold;
                }
            </style>
            <h2></h2>
            <picture>
                <img src="" alt="">
            </picture>
            <p></p>
            <a href="#" target="_blank">Learn More</a>
        `;
    }

    static get observedAttributes() {
        return ['title', 'img-src', 'description', 'link'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') this.shadowRoot.querySelector('h2').textContent = newValue;
        if (name === 'img-src') {
            this.shadowRoot.querySelector('img').src = newValue;
            this.shadowRoot.querySelector('img').alt = `Image of ${newValue}`;
        }
        if (name === 'description') this.shadowRoot.querySelector('p').textContent = newValue;
        if (name === 'link') this.shadowRoot.querySelector('a').href = newValue;
    }
}

// Register the custom element
customElements.define('project-card', ProjectCard);
