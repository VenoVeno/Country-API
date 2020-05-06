import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { createStructuredSelector } from 'reselect';

import { CountryList } from '../country-list/country-list.component';
import './autocomplete.styles.scss';

import { connect } from 'react-redux';
import { updateCountryStart } from '../../redux/country/country.actions';
import { selectCountry, selectCountryArray, selectRegion } from '../../redux/country/country.selectors';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      // To render Country details
      display: false,
      // Country detail,
      filteredSearch: [],
    };
  }

  onChange = e => {
    const { countryArray } = this.props;

    const userInput = e.currentTarget.value;

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
      userInput: e.currentTarget.innerText,
      display: true
    }, () => {
      const { countries } = this.props;
      const { userInput } = this.state;

      const CountryDetail = countries.filter(
        country =>
          country.name.toLowerCase() === (userInput.toLowerCase())
      );
      this.setState({
        filteredSearch: CountryDetail
      });
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
        display: true
      }, () => {
        const { countries } = this.props;
        const { userInput } = this.state;

        const CountryDetail = countries.filter(
          country =>
            country.name.toLowerCase() === (userInput.toLowerCase())
        );
        this.setState({
          filteredSearch: CountryDetail
        });
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        display
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }
    //Local State
    const { filteredSearch } = this.state;
    //From Redux
    const { region, updateCountryStart } = this.props;
    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder="Search Country"
        />
        <select
          value={this.state.selectedRegion}
          onChange={
            e => {
              updateCountryStart(e.target.value)
              this.setState({
                selectedTeam: e.target.value,
              })
            }
          }
        >
          <option selected value="none">Show All Regions</option>
          {
            region
              ? region.map(Region => (
                Region ? <option value={Region}>{Region}</option> : null))
              : null
          }
        </select>
        <div className="list-component">
          {suggestionsListComponent}
        </div>
        {
          display
            ? <CountryList country={filteredSearch} />
            : null
        }
      </Fragment >
    );
  }
}

const mapStateToProps = createStructuredSelector({
  countries: selectCountry,
  countryArray: selectCountryArray,
  region: selectRegion
});

const mapDispatchToProps = (dispatch) => ({
  updateCountryStart: (region) => dispatch(updateCountryStart(region))
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
