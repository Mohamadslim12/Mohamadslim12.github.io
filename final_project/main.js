const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');
const languageInput = document.getElementById('language-input');
const currencyInput = document.getElementById('currency-input');
let countriesData = [];
let filteredData = null;
let visibleCountries = 12;

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,languages,currencies');
        const data = await response.json();

        countriesData = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );

        displayCountries(countriesData);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function fetchCountriesByLanguage(language) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/lang/${language}`);
        const data = await response.json();

        const sortedCountries = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );
        filteredData = sortedCountries;
        visibleCountries = 12;
        displayCountries(filteredData);
    } catch (error) {
        console.error(`Error fetching countries for language:`, error);
        alert(`No countries found for the language.`);
    }
}

async function fetchCountriesByCurrency(currency) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
        const data = await response.json();

        const sortedCountries = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );
        filteredData = sortedCountries;
        visibleCountries = 12;
        displayCountries(filteredData);
    } catch (error) {
        console.error(`Error fetching countries for currency:`, error);
        alert(`No countries found for the currency.`);
    }
}

fetchCountries();

function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    const countriesToDisplay = countries.slice(0, visibleCountries);
    if (countries.length === 0) {
        countriesContainer.innerHTML = `<p class="text-center">No countries found.</p>`;
        return;
    }
    countriesToDisplay.forEach(country => {
        const countryCard = `
            <div class="col-md-4">
                <div class="card mb-3">
                    <img src="${country.flags.png}" class="card-img-top flag" alt="${country.name.common}">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <p class="card-text">Region: ${country.region}</p>
                        <a href="country.html?name=${country.name.common}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>`;
        countriesContainer.innerHTML += countryCard;
    });
    const loadMoreButton = document.getElementById('load-more');
    if (visibleCountries >= countries.length) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}
function loadMoreCountries() {
    visibleCountries += 12;
    if (filteredData) {
        displayCountries(filteredData); 
    } else {
        displayCountries(countriesData); 
    }
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredData = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    visibleCountries = 12;
    displayCountries(filteredData);
}

function handleFetchByLanguage() {
    const language = languageInput.value.trim().toLowerCase();
    if (!language) {
        alert('Please enter a valid language.');
        return;
    }
    fetchCountriesByLanguage(language);
}

function handleFetchByCurrency() {
    const currency = currencyInput.value.trim().toLowerCase();
    if (!currency) {
        alert('Please enter a valid currency.');
        return;
    }
    fetchCountriesByCurrency(currency);
}

let isAscending = true; 
function toggleAlphabeticalOrder() {
    isAscending = !isAscending;
    const dataToSort = filteredData || countriesData;
    if (isAscending) {
        dataToSort.sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
        });
    } else {
        dataToSort.sort((a, b) => {
            return b.name.common.localeCompare(a.name.common);
        });
    }
    visibleCountries = 12;
    displayCountries(dataToSort);
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
