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

const items = {
    "projects": [
      {
        "title": "Google STEP Intern",
        "img-src": "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-1024.png",
        "img-alt": "Google Logo",
        "description": "Worked within Android Core Experiments and Gantry to develop and implement new feature flags for project workflows using Java, TypeScript, Guice (dependency injection), and Redux. Designed and implemented Remote Procedure Calls to enable seamless backend communication, and developed numerous frontend features where the RPCs were integrated, resulting in dynamic and user-friendly interfaces.",
        "link": "https://buildyourfuture.withgoogle.com/programs/step"
      },
      {
        "title": "Electrical and Computer Engineering Dept. Software Intern",
        "img-src": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Seal_of_the_University_of_California%2C_San_Diego.svg",
        "img-alt": "UCSD Logo",
        "description": "Worked with Professors Curt Schurgers and Ramsin Khoshabeh to design and create an enhanced access control system for numerous spaces at UCSD. As a backend developer, I utilized MySQL, TypeScript, Express.js, and Node.js to create a centralized database and server.",
        "link": "https://ersp.ucsd.edu/"
      },
      {
        "title": "Alpha House Society Desktop Support Intern",
        "img-src": "https://kitsforacause.com/wp-content/uploads/2024/08/Alpha-House-logo-2022-dark.jpg",
        "img-alt": "Alpha House Logo",
        "description": "Designed and implemented a program that filters and categorizes new employee data records for simpler and more efficient data entry using Python. Assisted with IT support across multiple departments, installing OS, software, and responding to user requests.",
        "link": "https://alphahousecalgary.com/"
      },
      {
        "title": "Sponsor Energy Inc. Marketing and IT Intern",
        "img-src": "https://calgarydropin.ca/wp-content/uploads/2021/07/444-4446647_sponsor-energy-logo-graphics-clipart-1.png",
        "img-alt": "Sponsor Energy Logo",
        "description": "Worked at Sponsor Energy, designing and creating an FAQ page for the company website using HTML, CSS, and PHP. Also worked on remodeling the client billing platform into a more user-friendly interface using React.js and JavaScript.",
        "link": "https://sponsorenergy.com/?srsltid=AfmBOoqE8xAHg6JX-4_qumXYsmpViSRd-erQEOtv4YwAZOqsPs9PJmWM"
      },
      {
        "title": "Triton Software Engineering Software Developer",
        "img-src": "https://cse.ucsd.edu/sites/default/files/top-level/tse-logo-yellow.png",
        "img-alt": "TSE Logo",
        "description": "Triton Software Engineering is a multidisciplinary student organization at UC San Diego. I work as a software developer, implementing a web and mobile application for the San Diego County Taxpayers Association using MongoDB, Express, React, Node, and React Redux.",
        "link": "https://tritonse.github.io/"
      },
      {
        "title": "Triton Robotics Embedded Developer",
        "img-src": "https://avatars.githubusercontent.com/u/74093064?s=200&v=4",
        "img-alt": "Triton Robotics Logo",
        "description": "Worked on coding an STM-32 nucleo board to control motors, sensors, and actuators, allowing for robot movement. Developed Mutex threading to more efficiently print to console while running robot code. Currently working on a centralized turret class for multiple robots.",
        "link": "https://tritonrobotics.org/"
      }
    ]
  }
  

// Register the custom element
customElements.define('project-card', ProjectCard);

document.getElementById('loadLocalBtn').addEventListener('click', loadLocalData);
document.getElementById('loadRemoteBtn').addEventListener('click', loadRemoteData);

localStorage.setItem('items', JSON.stringify(items['projects']));

// Load data from localStorage
function loadLocalData() {
    const data = JSON.parse(localStorage.getItem('items'));
    if (data) {
        renderProjectCards(data);
    } else {
        alert('No data found in localStorage!');
    }
}

// Load data from a remote server
function loadRemoteData() {
    fetch('https://my-json-server.typicode.com/emmaz12/jsonServerCSE134/items') 
        .then(response => response.json())
        .then(data => renderProjectCards(data))
        .catch(error => console.error('Error fetching remote data:', error));
}

// Render project cards dynamically
function renderProjectCards(data) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    data.forEach(project => {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('title', project.title);
        projectCard.setAttribute('img-src', project['img-src']);
        projectCard.setAttribute('description', project.description);
        projectCard.setAttribute('link', project['link']);
        container.appendChild(projectCard);
    });
}

