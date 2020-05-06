import React from 'react';

// import { SearchBox } from './components/SearchBox/search-box.component';
// import { CountryList } from './components/country-list/country-list.component';
import Autocomplete from './components/autocomplete/autocomplete.component';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchField: "",
      countries: []
    }
  }

  // async componentDidMount(): Promise<void> {
  //   const url = "https://restcountries.eu/rest/v2/all";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   this.setState({

  //   })
  // }

  componentDidMount = () => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(data => {
        this.setState({
          countries: data
        })
        console.log(data);
      }
      )
  }

  handleChange = (e) => {
    this.setState({
      searchField: e.target.value
    })
  }
  render() {

    // const { searchField } = this.state;
    // const filteredCountries = countries.filter(country =>
    //   country.name.toLowerCase().includes(searchField.toLowerCase())
    // );

    const { countries } = this.state;
    const countryArray = countries.map(obj => {
      return obj.name
    });

    return (
      <div className="App">
        <h1>Search For Country</h1>
        <Autocomplete suggestions={countryArray} country={countries} />
        {/* <SearchBox
          placeholder="Search Country"
          handleChange={this.handleChange}
        />
        <h1>{this.state.country}</h1>
        <CountryList country={filteredCountries} /> */}
      </div>
    )
  }
}

export default App;
