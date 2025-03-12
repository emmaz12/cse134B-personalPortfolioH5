/*index - header, footer, section, body, toggle*/
/*education - body*/
/*internship - sections, body*/
/*extracurricular - body, sections*/
/*hobby - body, sections*/
/*contact - body, table, form*/

const toggleButton = document.getElementById("toggle");

const sections = document.querySelectorAll("section");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const table = document.getElementById("table");
const form = document.getElementById("contactForm");

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Check and apply saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("darkMode");

        sections.forEach(section => {
            section.classList.add("darkModeSubsection");
        });

        if (footer) footer.classList.add("darkModeSubsection");
        if (header) header.classList.add("darkModeSubsection");
        if (table) table.classList.add("darkModeSubsection");
        if (form) form.classList.add("darkModeSubsection");

        if(toggleButton) toggleButton.textContent = "☀️"
    }

    if (savedTheme === "light") {
        body.classList.remove("darkMode");

        sections.forEach(section => {
            section.classList.remove("darkModeSubsection");
        });

        if (footer) footer.classList.remove("darkModeSubsection");
        if (header) header.classList.remove("darkModeSubsection");
        if (table) table.classList.remove("darkModeSubsection");
        if (form) form.classList.remove("darkModeSubsection");
        if(toggleButton) toggleButton.textContent = "🌙"
    }

    // Toggle theme and save to localStorage
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const isDarkMode = body.classList.toggle("darkMode");
    
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
            toggleButton.textContent = isDarkMode ? "☀️" : "🌙";

        location.reload()
        });
    }
});
