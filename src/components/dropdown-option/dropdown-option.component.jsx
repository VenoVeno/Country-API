import React from 'react';

import './dropdown.styles.scss';

const DropDownOption = ({ children, ...props }) => {
    return (
        <option {...props}> {children}</option>
    )
}

export default DropDownOption;