import React from 'react';

import './search-box.styles.scss';

const SearchBox = ({ ...props }) => (
    <div className="input-container">
        <input {...props} />
    </div>
)

export default SearchBox;