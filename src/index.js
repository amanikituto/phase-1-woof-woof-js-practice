const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info');

// Function to fetch all dog data
async function fetchDogs() {
    const response = await fetch('http://localhost:3000/pups');
    const pups = await response.json();
    return pups;
}

// Function to display a dog's details 
function displayDogInfo(pup) {
    dogInfo.innerHTML = `
        <img src="${pup.image}" />
        <h2>${pup.name}</h2>
        <button id="good-dog-btn">${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
    `;

    // Add event listener to the good-dog-btn
    document.getElementById('good-dog-btn').addEventListener('click', () => {
        toggleGoodDog(pup.id);
    });
}

// Function to toggle good/bad dog status
async function toggleGoodDog(pupId) {
    const updatedPup = { isGoodDog: !pup.isGoodDog }; // Update the status

    try {
       const response = await fetch(`http://localhost:3000/pups/${pupId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPup) 
        });

        // ... Update the UI based on successful response 
    } catch (error) {
        console.error("Error updating dog:", error);
    }
}

// Function to render dog names in the dog bar
function renderDogBar(pups) {
    dogBar.innerHTML = ''; // Clear existing content

    pups.forEach(pup => {
        const dogSpan = document.createElement('span');
        dogSpan.textContent = pup.name;
        dogSpan.addEventListener('click', () => displayDogInfo(pup));
        dogBar.appendChild(dogSpan);
    });
}

// Main: Fetch data and initialize display
async function fetchAndRender() {
    const pups = await fetchDogs();
    renderDogBar(pups); 
}

fetchAndRender(); 
