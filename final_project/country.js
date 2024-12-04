const countryDetails = document.getElementById('country-details');

async function fetchCountryDetails(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();
        displayCountryDetails(data[0]);
    } catch (error) {
        console.error('Error fetching country details:', error);
    }
}

const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');
fetchCountryDetails(countryName);

function displayCountryDetails(country) {
    let currencies = 'N/A';
    if (country.currencies) {
        currencies = Object.values(country.currencies)
            .map(curr => `${curr.name} (${curr.symbol})`)
            .join(', ');
    }

    let idd = 'N/A';
    if (country.idd && country.idd.root) {
        idd = country.idd.root; 
        if (country.idd.suffixes && country.idd.suffixes.length < 2) {
            idd += country.idd.suffixes[0];
        }
    }

    let countryCode = 'N/A';
    if (country.cca3) {
        countryCode = country.cca3;
    }
   
    let languages = 'N/A';
    if (country.languages) {
        const languageArray = Object.values(country.languages);
        languages = languageArray.join(', ');
    }
   
    let isUNMember = 'No';
    if (country.unMember) {
        isUNMember = 'Yes';
    }

    let capital = 'N/A';
    if (country.capital) {
        capital = country.capital.join(', ');
    }
   
    let subregion = 'N/A';
    if (country.subregion) {
        subregion = country.subregion;
    }
   
    let timezones = 'N/A';
    if (country.timezones) {
        timezones = country.timezones.join(', ');
    }
    let demonym = 'N/A';
    if (country.demonyms && country.demonyms.eng && country.demonyms.eng.m) {
        demonym = country.demonyms.eng.m;
    }
    const details = `
        <div class="col-md-12">
            <div class="card">
                <img src="${country.flags.png}" class="card-img-top flag" alt="${country.name.common}">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text"><strong>Official Name:</strong> ${country.name.official}</p>
                    <p class="card-text"><strong>Demonym:</strong> ${demonym}</p>
                    <p class="card-text"><strong>Capital:</strong> ${capital}</p>
                    <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                    <p class="card-text"><strong>Subregion:</strong> ${subregion}</p>
                    <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p class="card-text"><strong>Languages:</strong> ${languages}</p>
                    <p class="card-text"><strong>Currencies:</strong> ${currencies}</p>
                    <p class="card-text"><strong>Country Code:</strong> ${countryCode}</p>
                    <p class="card-text"><strong>IDD:</strong> ${idd}</p>
                    <p class="card-text"><strong>Timezones:</strong> ${timezones}</p>
                    <p class="card-text"><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                    <p class="card-text"><strong>UN Member:</strong> ${isUNMember}</p>
                </div>
            </div>
        </div>`;
    countryDetails.innerHTML = details;
}
