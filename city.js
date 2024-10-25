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
    if (!city) {
        document.querySelector('.city-info').innerHTML = '<p>City not found</p>';
        return;
    }

    // Updating city details on the page
    document.querySelector('.city-info h2').textContent = city.name;
    document.querySelector('.city-info .location').textContent = 'Location: ' + city.name;
    document.querySelector('.city-info .description').textContent = 'Budget: $' + city.budget + ' per day';

    // Updating the itinerary image
    const itineraryImage = document.querySelector('.image-container img');
    itineraryImage.src = city.img;
    itineraryImage.alt = city.name;

    // Updating trip details
    const detailsTable = document.querySelector('.trip-details');
    detailsTable.innerHTML = `
        <p>Food Cost: $${city.foodCost} per day</p>
        <p>Accommodation Cost: $${city.accomodationCost} per day</p>
        <p>Transportation Cost: $${city.transportationCost} per day</p>
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
