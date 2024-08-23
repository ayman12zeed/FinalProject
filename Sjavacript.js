document.addEventListener('DOMContentLoaded', (event) => {
    const initialContacts = [
        { name: "Ayman Zeed", email: "Ayman.zeed@gmail.com", phone: "+972 50-3045074", age: 23, address: "Haifa", avatar: "avatars/9.jpg" },
        { name: "Arwad Rahal", email: "arwad.rahal@gmail.com", phone: "+972 50-3982223", age: 20, address: "Tel-Aviv", avatar: "avatars/10.jpg" },
        { name: "Yasmen Hilou", email: "Yasmen.hilou@gmail.com", phone: "+972 54-3563636", age: 21, address: "Araba", avatar: "avatars/4.jpg" },
        { name: "Jana Shaaban", email: "Jana.Shaaban@gmail.com", phone: "+972 50-5179503", age: 21, address: "Natanya", avatar: "avatars/1.jpg" },
        { name: "Danya Sawaeed", email: "Danya.Sawaeed@gmail.com", phone: "+972 50-5179503", age: 21, address: "Ako", avatar: "avatars/6.jpg" },
        { name: "Ola Khateeb", email: "Ola_Khateeb@gmail.com", phone: "+972 50-2541373", age: 22, address: "Nazareth", avatar: "avatars/2.jpg" },
        { name: "Seeba Anabose", email: "Seeba.anabose@gmail.com", phone: "+972 52-2966499", age: 21, address: "Ako", avatar: "avatars/5.jpg" },
        { name: "Adam Baria", email: "Adam_baria@gmail.com", phone: "+972 54-3980730", age: 21, address: "Ako", avatar: "avatars/3.jpg" },
        { name: "Yaman Zeed", email: "Yaman.zeed@gmail.com", phone: "+972 50-5897935", age: 21, address: "Haifa", avatar: "avatars/7.jpg" },
        { name: "Ahmad Zeed", email: "Ahmad.zeed@gmail.com", phone: "+972 50-6337774", age: 21, address: "Haifa", avatar: "avatars/8.jpg" }
    ];

    let contacts = [...initialContacts];
    let editingContactIndex = null;

    const renderContacts = (filter = "") => {
        const contactList = document.getElementById("contactList");
        contactList.innerHTML = "";

        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.email.toLowerCase().includes(filter.toLowerCase()) ||
            contact.phone.includes(filter)
        );

        filteredContacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.classList.add("contact-item");
            li.innerHTML = `
                <div class="contact-avatar">
                    <img src="${contact.avatar || 'default-avatar.png'}" alt="Avatar">
                </div>
                <div class="contact-details">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-actions">
                        <button onclick="editContact(${index})">Edit</button>
                        <button onclick="showInfo(${index})">Info</button>
                        <button onclick="deleteContact(${index})">Delete</button>
                    </div>
                </div>`;
            contactList.appendChild(li);
        });
    };

    const saveContact = (name, email, phone, age, address, avatar) => {
        if (editingContactIndex === null) {
            contacts.push({ name, email, phone, age, address, avatar });
        } else {
            contacts[editingContactIndex] = { name, email, phone, age, address, avatar };
        }

        renderContacts();
        document.getElementById("contactForm").reset();
        document.getElementById("popup").style.display = "none";
    };

    window.editContact = (index) => {
        editingContactIndex = index;
        const contact = contacts[index];
        document.getElementById("name").value = contact.name;
        document.getElementById("email").value = contact.email;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("age").value = contact.age || '';
        document.getElementById("address").value = contact.address || '';
        document.getElementById("popupTitle").textContent = "Edit Contact";
        document.getElementById("popup").style.display = "block";
    };

    window.showInfo = (index) => {
        const contact = contacts[index];
        document.getElementById("infoName").textContent = `Name: ${contact.name}`;
        document.getElementById("infoAge").textContent = `Age: ${contact.age || 'N/A'}`;
        document.getElementById("infoPhone").textContent = `Phone: ${contact.phone}`;
        document.getElementById("infoAddress").textContent = `Address: ${contact.address || 'N/A'}`;
        document.getElementById("infoModal").style.display = "block";
    };

    window.deleteContact = (index) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            contacts.splice(index, 1);
            renderContacts();
        }
    };

    document.getElementById("openPopupButton").addEventListener("click", () => {
        editingContactIndex = null;
        document.getElementById("contactForm").reset();
        document.getElementById("popupTitle").textContent = "Add Contact";
        document.getElementById("popup").style.display = "block";
    });

    document.getElementById("closePopupButton").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

    document.getElementById("contactForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;

        const avatarInput = document.getElementById("avatar");
        let avatar = "";
        if (avatarInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatar = e.target.result;
                saveContact(name, email, phone, age, address, avatar);
            };
            reader.readAsDataURL(avatarInput.files[0]);
        } else {
            avatar = editingContactIndex !== null ? contacts[editingContactIndex].avatar : "";
            saveContact(name, email, phone, age, address, avatar);
        }
    });

    document.getElementById("searchInput").addEventListener("input", (event) => {
        renderContacts(event.target.value);
    });

    window.deleteContacts = () => {
        const confirmation = window.confirm("Are you sure you want to delete all contacts?");
        if (confirmation) {
            contacts = [];
            renderContacts();
        }
    };

    document.getElementById("closeInfoModal").addEventListener("click", () => {
        document.getElementById("infoModal").style.display = "none";
    });

    window.onclick = (event) => {
        if (event.target == document.getElementById("infoModal")) {
            document.getElementById("infoModal").style.display = "none";
        }
    };

    renderContacts();
});
