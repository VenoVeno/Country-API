import React from 'react';

const Array = ({ array }) => {
    return (
        <div key="">
            {
                array.map(obj => (
                    <h1> {obj.name}</h1>
                ))
            }
        </div >
    )
}

export default Array;