document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const commentsInput = document.getElementById("comments");
    const errorMessage = document.getElementById("errorOutput");
    const infoMessage = document.getElementById("infoOutput");
    const charCount = document.getElementById("charCount");
    const formErrors = [];

    const pattern = /^[a-zA-Z0-9!., ]+$/;

    commentsInput.addEventListener("input", (e) => {
        const value = e.target.value;
        if (!pattern.test(value)) {
            commentsInput.setCustomValidity("Illegal character entered");
            commentsInput.classList.add("error");
            errorMessage.textContent = "Illegal character entered!";
            errorMessage.style.color = "red";
            errorMessage.style.display = "block";
            setTimeout(() => {
                commentsInput.classList.remove("error");
                errorMessage.style.display = "none";
            }, 1000);
            formErrors.push({
                field: "comments",
                error: "Illegal character entered",
                value: value
            });
        } else {
            commentsInput.classList.remove("error");
            commentsInput.setCustomValidity("");
        }
    });

    commentsInput.addEventListener("input", (e) => {
        const remaining = 100 - e.target.value.length;
        charCount.textContent = `Characters left: ${remaining}`;
        
        if (remaining <= 10) {
            infoMessage.textContent = `Warning: ${remaining} characters left.`;
            infoMessage.style.color = "red"
        } else {
            commentsInput.classList.remove("warning");
            infoMessage.textContent = "";
        }

        if (remaining == 0) {
            formErrors.push({
                field: "comments",
                error: "Over 100 characters",
            });
        }
    });

    form.addEventListener("submit", (e) => {
        const formErrorsInput = document.getElementById("formErrors");
        let isValid = true;

        if (!commentsInput.checkValidity()) {
            isValid = false;
        }

        if (isValid) {
            formErrorsInput.value = JSON.stringify(formErrors);
            form.submit(); 
            
            setTimeout(() => {
                infoMessage.textContent = "Successfully submitted";
            }, 1000)
        } else {
            setTimeout(() => {
                errorMessage.textContent = "Unable to submit form, please fix form errors"
            }, 1000)
        }
    });
});
