import React from 'react';

const Array = ({ array }) => {
    return (
        <div key="">
            <span>
                {
                    array.map(obj => (
                        <span>{obj.name}<br></br></span>
                    ))
                }
            </span>

        </div >
    )
}

export default Array;