document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const accordion = document.getElementById("accordion");

    userForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (name && email) {
            createUser(name, email);
            userForm.reset();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    function createUser(name, email) {
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        accordionItem.innerHTML = `
          <div class="accordion-header">${name}</div>
          <div class="user-details">
            <p class="registered-email"><strong>Email:</strong> ${email}</p>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
          </div>
        `;
        accordion.appendChild(accordionItem);

        const accordionHeader = accordionItem.querySelector(".accordion-header");
        const userDetails = accordionItem.querySelector(".user-details");

        accordionItem.addEventListener("click", function () {
            userDetails.classList.toggle("open");
        });

        const editButton = accordionItem.querySelector(".edit-btn");
        editButton.addEventListener("click", function (e) {
            e.preventDefault();

            const modal = document.getElementById("editModal");
            const span = modal.querySelector(".close");
            const newNameInput = modal.querySelector("#newName");
            const newEmailInput = modal.querySelector("#newEmail");
            const saveChangesBtn = modal.querySelector("#saveChanges");

            newNameInput.value = name;
            newEmailInput.value = email;

            modal.style.display = "block";

            span.onclick = function () {
                modal.style.display = "none";
            };

            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            };

            saveChangesBtn.onclick = function (event) {
                event.preventDefault();

                const newName = newNameInput.value;
                const newEmail = newEmailInput.value;

                if (newName && newEmail) {
                    if (newName !== name) {
                        accordionHeader.textContent = newName;
                    }
                    if (newEmail !== email) {
                        userDetails.querySelector(".registered-email").textContent =
                            "Email: " + newEmail;
                    }

                    modal.style.display = "none";
                } else {
                    alert("Por favor, preencha todos os campos.");
                }
            };
        });

        const deleteButton = accordionItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            accordionItem.remove();
        });
    }
});
