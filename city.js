// Fetching data from the JSON file
async function fetchCities() {
    try {
        const response = await fetch('cities.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const cities = await response.json();
        return cities;
    } catch (error) {
        console.error('Failed to fetch cities:', error);
    }
}

// Function to get URL parameters
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to display city details
function displayCityDetails(city) {
    const cityInfoContainer = document.querySelector('.city-info');
    const imageContainer = document.querySelector('.image-container img');
    const detailsTable = document.querySelector('.trip-details');

    if (!cityInfoContainer || !imageContainer || !detailsTable) {
        console.error('One or more required elements are missing from the DOM');
        return;
    }

    if (!city) {
        cityInfoContainer.innerHTML = '<p>City not found</p>';
        return;
    }

    // Updating city details on the page
    cityInfoContainer.querySelector('h2').textContent = city.name || 'Unknown City';
    cityInfoContainer.querySelector('.location').textContent = 'Location: ' + (city.name || 'Unknown');
    cityInfoContainer.querySelector('.description').textContent = 'Budget: $' + (city.budget || 'N/A') + ' per day';

    // Updating the itinerary image
    imageContainer.src = city.img || 'default-image.jpg'; // Fallback to a default image if `city.img` is missing
    imageContainer.alt = city.name || 'City image';

    // Updating trip details
    detailsTable.innerHTML = `
        <p>Food Cost: $${city.foodCost || 'N/A'} per day</p>
        <p>Accommodation Cost: $${city.accommodationCost || 'N/A'} per day</p>
        <p>Transportation Cost: $${city.transportationCost || 'N/A'} per day</p>
    `;
}

// Main function to load and display city information
async function loadCityData() {
    const cities = await fetchCities();
    if (!cities) return;

    // Get the city name from the URL
    const cityName = getParameterByName('name');
    const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());

    // Display the city details
    displayCityDetails(city);
}

// Run the main function to load city data
window.addEventListener('DOMContentLoaded', loadCityData);
