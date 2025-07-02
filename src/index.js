document.addEventListener('DOMContentLoaded', () => {

const dogForm = document.getElementById("dog-form");
const tableBody = document.getElementById("table-body");
const baseURL =  "http://localhost:3000/dogs";


let currentDogId = null;

fetchDogs();

dogForm.addEventListener("submit", e => {
    e.preventDefault();
    const updateDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value
    };

    fetch(`${baseURL}/${currentDogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(updateDog)
    })
    .then(resp => resp.json())
    .then(() => {
        dogForm.reset();
        currentDogId = null;
        fetchDogs();
        });
});

function fetchDogs() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(dogs => renderTable(dogs));
}

function renderTable(dogs) {
    tableBody.innerHTML = "";
    dogs.forEach(dog => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
        `;
        const editBTN = tr.querySelector("button");
        editBTN.addEventListener("click", () => loadDogToForm(dog));
    tableBody.appendChild(tr);
    });
}

function loadDogToForm(dog) { 
    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
    currentDogId = dog.id;
}
});