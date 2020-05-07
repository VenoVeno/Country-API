import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

// import { SearchBox } from './components/SearchBox/search-box.component';
import Autocomplete from './components/autocomplete/autocomplete.component';
import { CountryList } from './components/country-list/country-list.component';

import './App.css';

import { fetchCountryStart } from './redux/country/country.actions';
import { selectFilteredSearch } from './redux/country/country.selectors';
// import { selectCountry, selectCountryArray, selectRegion } from './redux/country/country.selectors';

const App = ({ fetchCountryStart, filteredCountry }) => {
  // class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     searchField: "",
  //     countries: []
  //   }
  // }

  // async componentDidMount(): Promise<void> {
  //   const url = "https://restcountries.eu/rest/v2/all";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   this.setState({

  //   })
  // }

  // componentDidMount = () => {
  //   fetch("https://restcountries.eu/rest/v2/all")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         countries: data
  //       })
  //       console.log(data);
  //     }
  //     )
  // }

  // componentDidMount = () => {
  //   const { fetchCountryStart } = this.props;
  //   fetchCountryStart();
  // }

  useEffect(() => {
    fetchCountryStart();
  }, [fetchCountryStart]);

  // handleChange = (e) => {
  //   this.setState({
  //     searchField: e.target.value
  //   })
  // }
  // render() {

  // const { searchField } = this.state;
  // const filteredCountries = countries.filter(country =>
  //   country.name.toLowerCase().includes(searchField.toLowerCase())
  // );

  // const { countries } = this.state;
  // const countryArray = countries.map(obj => {
  //   return obj.name
  // });

  return (
    <div className="App">
      <h1>Search For Country</h1>
      <Autocomplete />
      {filteredCountry ? <CountryList country={filteredCountry} /> : null}
      {/* <SearchBox
          placeholder="Search Country"
          handleChange={this.handleChange}
        />
        <h1>{this.state.country}</h1>
        <CountryList country={filteredCountries} /> */}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  filteredCountry: selectFilteredSearch
})

const mapDispatchToProps = (dispatch) => ({
  fetchCountryStart: () => dispatch(fetchCountryStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);