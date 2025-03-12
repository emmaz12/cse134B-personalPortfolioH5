document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("createBtn");
    const updateBtn = document.getElementById("updateBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const crudForm = document.getElementById("crudForm");
    const idInput = document.getElementById("id");
    const dataInput = document.getElementById("data");
    const list = document.getElementById("list");

    // Load existing data from localStorage
    loadData();

    // Handle form submissions
    crudForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleCreate();
    });

    // Create data (Save in localStorage)
    createBtn.addEventListener("click", () => {
        handleCreate();
    });

    // Update data
    updateBtn.addEventListener("click", () => {
        handleUpdate();
    });

    // Delete data
    deleteBtn.addEventListener("click", () => {
        handleDelete();
    });

    // Create a new data entry
    function handleCreate() {
        const id = idInput.value;
        const data = dataInput.value;

        if (!id || !data) {
            alert("Please provide both ID and data.");
            return;
        }

        const newData = { id: id, data: data };
        localStorage.setItem(`data-${id}`, JSON.stringify(newData));

        loadData(); // Reload the list after adding
    }

    // Update existing data
    function handleUpdate() {
        const id = idInput.value;
        const data = dataInput.value;

        if (!id || !data) {
            alert("Please provide both ID and data.");
            return;
        }

        const existingData = JSON.parse(localStorage.getItem(`data-${id}`));

        if (existingData) {
            existingData.data = data;
            localStorage.setItem(`data-${id}`, JSON.stringify(existingData));
            loadData();
        } else {
            alert("No data found with that ID.");
        }
    }

    // Delete data by ID
    function handleDelete() {
        const id = idInput.value;

        if (!id) {
            alert("Please provide an ID to delete.");
            return;
        }

        localStorage.removeItem(`data-${id}`);
        loadData();
    }

    // Load data from localStorage and display it
    function loadData() {
        list.innerHTML = ""; // Clear current list

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("data-")) {
                const value = JSON.parse(localStorage.getItem(key));
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${value.id}, Data: ${value.data}`;
                list.appendChild(listItem);
            }
        }
    }
});
