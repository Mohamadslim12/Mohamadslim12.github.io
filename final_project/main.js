const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');
const languageInput = document.getElementById('language-input');
const currencyInput = document.getElementById('currency-input');
let countriesData = [];

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

fetchCountries();

function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    if (countries.length === 0) {
        countriesContainer.innerHTML = `<p class="text-center">No countries found.</p>`;
        return;
    }
    countries.forEach(country => {
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
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
}

function handleLanguageFilter() {
    const language = languageInput.value.toLowerCase();
    if (!language) return;

    const filteredCountries = countriesData.filter(country => {
        const countryLanguages = Object.values(country.languages || {}).map(lang =>
            lang.toLowerCase()
        );
        return countryLanguages.includes(language);
    });
    displayCountries(filteredCountries);
}

function handleCurrencyFilter() {
    const currency = currencyInput.value.toLowerCase();
    if (!currency) return;

    const filteredCountries = countriesData.filter(country => {
        const countryCurrencies = Object.values(country.currencies || {}).map(curr =>
            curr.name.toLowerCase()
        );
        return countryCurrencies.includes(currency);
    });
    displayCountries(filteredCountries);
}

let isAscending = true; 
function toggleAlphabeticalOrder() {
    isAscending = !isAscending; 

    if (isAscending) {
        countriesData.sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
        });
    } else {
        countriesData.sort((a, b) => {
            return b.name.common.localeCompare(a.name.common);
        });
    }

    displayCountries(countriesData);
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
