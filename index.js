document.addEventListener('DOMContentLoaded', function () {
    var radioButtons = document.querySelectorAll('input[name="sort"]');
    var articlesContainer = document.querySelector('.city-grid');
    var searchInput = document.getElementById('searchPlaces');
    var cities = []; // Store loaded cities

    // Load JSON data
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            cities = data; // Save the loaded data
            filterArticles(); // Initial filter with loaded data
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Update URL parameters based on sorting and search
    function updateUrlParams() {
        var selectedSort = document.querySelector('input[name="sort"]:checked').value;
        var searchQuery = searchInput.value;
        var url = new URL(window.location.href);
        url.searchParams.set('sort', selectedSort);
        url.searchParams.set('search', searchQuery);
        history.pushState({}, '', url);
    }

    // Filter articles by region and search term
    function filterArticles() {
        var selectedRegion = document.querySelector('input[name="sort"]:checked').value;
        var searchTerm = searchInput.value.toLowerCase();
        articlesContainer.innerHTML = ''; // Clear existing articles

        cities.forEach(function (city) {
            var isRegionMatch = (selectedRegion === 'All' || city.region === selectedRegion);
            var isSearchMatch = (!searchTerm || city.name.toLowerCase().includes(searchTerm));

            if (isRegionMatch && isSearchMatch) {
                var article = document.createElement('article');
                article.dataset.region = city.region;

                var title = document.createElement('h4');
                title.textContent = city.name;
                article.appendChild(title);

                var image = document.createElement('img');
                image.src = city.image;
                image.alt = city.name;
                article.appendChild(image);

                var description = document.createElement('p');
                description.textContent = city.description;
                article.appendChild(description);

                var price = document.createElement('p');
                price.textContent = `Price per day: $${city.pricePerDay}`;
                article.appendChild(price);

                articlesContainer.appendChild(article);
            }
        });
    }

    // Event listeners for sorting and search input
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            updateUrlParams();
            filterArticles(); // Filter with loaded data
        });
    });

    searchInput.addEventListener('input', function () {
        updateUrlParams();
        filterArticles(); // Filter with loaded data
    });
});
