import React from 'react';

import './suggestion-list.styles.scss';

const SuggestionList = ({ showSuggestion, userInput, filteredSuggestion, activeSuggestion, onClick }) => {
    if (showSuggestion && userInput) {
        if (filteredSuggestion.length) {
            return (
                <ul className="suggestions">
                    {
                        filteredSuggestion.map((suggestion, index) => {
                            const className = (index === activeSuggestion) ? "suggestion-active" : "suggestion"
                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })
                    }
                </ul>
            )
        } else {
            return (
                <div className="no-suggestions">
                    <em>No Suggestions, you're on your own!</em>
                </div>
            )
        }
    } else {
        return null;
    }
}

export default SuggestionList;