// Fetch Regions from API
export const updatedFetchedRegion = (dataJSON) => {
    const filteredRegion = Array.from(new Set(dataJSON.map(newObj => newObj.region)))
        .map(region => {
            return region
        })
        // .reverse()
        .filter(Boolean) // To remove empty Values
        .sort()
    return filteredRegion;
}

//Update Country Name Array for Suggestion based on Country
export const updateCountryArray = (countries) => {
    const countryArray = countries
        .map(country => {
            return country.name
        })
    return countryArray;
}

//Update Search Filter Array after Selection By User - onClick or Enter Key
export const updateSearchFilterArray = (userInput, countries) => {
    const searchFilteredCountry = countries
        .filter(country =>
            country.name.toLowerCase() === (userInput.toLowerCase())
        )
    return searchFilteredCountry;
}