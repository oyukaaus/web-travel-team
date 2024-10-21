document.addEventListener('DOMContentLoaded', function () {
    var cities;

    function updateCityInformation(city, selectedDays) {
        var cityNameElement = document.querySelector('section h4');
        var budgetElement = document.querySelector('.budget');
        var budList = document.querySelector('.Bud');
        var imgElement = document.querySelector('section img');

        cityNameElement.textContent = city.name;

        var newBudget = city.budget * selectedDays;
        budgetElement.textContent = 'Estimated budget: ($' + newBudget + ')';

        budList.innerHTML = `<li>Food ($${city.foodCost * selectedDays})</li>
                            <li>Accommodation ($${city.accomodationCost * selectedDays})</li>
                            <li>Transportation ($${city.transportationCost * selectedDays})</li>`;
        imgElement.src = 'assets/' + city.name.toLowerCase() + '.png';
        cityInfoCard.render(city);
    }

    var sortOptions = document.querySelectorAll('.Sort');
    sortOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            var sortBy = option.textContent.trim();
            var sortedCities;

            switch (sortBy) {
                case 'Accomodation cost':
                    sortedCities = cities.slice().sort((a, b) => a.accomodationCost - b.accomodationCost);
                    break;
                case 'Food cost':
                    sortedCities = cities.slice().sort((a, b) => a.foodCost - b.foodCost);
                    break;
                case 'Transportation cost':
                    sortedCities = cities.slice().sort((a, b) => a.transportationCost - b.transportationCost);
                    break;
                default:
                    sortedCities = cities.slice().sort((a, b) => a.budget - b.budget);
                    break;
            }

            if (sortedCities.length > 0) {
                var selectedDays = parseInt(document.querySelector('input[name="filter"]:checked').value);
                updateCityInformation(sortedCities[0], selectedDays);
            }
        });
    });

    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            cities = data;

            var radioButtons = document.getElementsByName('filter');
            radioButtons.forEach(function (radioButton) {
                radioButton.addEventListener('change', function () {
                    var selectedDays = parseInt(this.value);

                    if (cities) {
                        var sortedCities = cities.slice().sort((a, b) => a.budget - b.budget);
                        if (sortedCities.length > 0) {
                            updateCityInformation(sortedCities[0], selectedDays);
                        }
                    }
                });
            });

            radioButtons[0].checked = true;
        })
        .catch(error => console.error('Error fetching city data:', error));
});