import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import { createStructuredSelector } from 'reselect';

// import { CountryList } from '../country-list/country-list.component';
import SearchBox from '../search-box/search-box.component';
import DropDown from '../dropdown/dropdown.component';
import SuggestionList from '../suggestion-list/suggestion-list.component';

import './autocomplete.styles.scss';

import { connect } from 'react-redux';
import { updateCountryStart, updateFilteredCountry } from '../../redux/country/country.actions';
import { selectCountryArray } from '../../redux/country/country.selectors';

class Autocomplete extends React.Component {
  // static propTypes = {
  //   suggestions: PropTypes.instanceOf(Array)
  // };

  // static defaultProps = {
  //   suggestions: []
  // };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = (e) => {
    const { countryArray } = this.props; //From Redux State
    const userInput = e.currentTarget.value; //From User Input

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = countryArray.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    }, () => {

      // this.setState({
      //   filteredSearch: CountryDetail
      // });

      // const { countries } = this.props; //From Redux State

      // const CountryDetail = countries.filter(
      //   country =>
      //     country.name.toLowerCase() === (userInput.toLowerCase())
      // );

      const { userInput } = this.state; //From User Input
      const { updateFilteredCountry } = this.props;
      updateFilteredCountry(userInput);
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      }, () => {
        const { userInput } = this.state;
        const { updateFilteredCountry } = this.props;
        updateFilteredCountry(userInput);
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) return;
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange, onClick, onKeyDown,
      state: {
        activeSuggestion, filteredSuggestions, showSuggestions, userInput
      }
    } = this;

    const { updateCountryStart } = this.props;
    return (
      <Fragment>
        <div className="input-search">
          <SearchBox
            type="search"
            name="search"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder="Search Country"
          />
          <DropDown
            name="region-select" onChange={e => updateCountryStart(e.target.value)}
          />
        </div>
        <div className="list-component">
          <SuggestionList
            showSuggestion={showSuggestions}
            userInput={userInput}
            filteredSuggestion={filteredSuggestions}
            activeSuggestion={activeSuggestion}
            onClick={onClick}
          />
        </div>
        {/* <div className="list-component">
              {suggestionsListComponent}
            </div> */}
        {/* {
          display
            ? <CountryList country={filteredSearch} />
            : null
        } */}
      </Fragment >
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // countries: selectCountry,
  countryArray: selectCountryArray
  // filteredSearch: selectFilteredSearch
});

const mapDispatchToProps = (dispatch) => ({
  updateCountryStart: (region) => dispatch(updateCountryStart(region)),
  updateFilteredCountry: (userInput) => dispatch(updateFilteredCountry(userInput))
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);