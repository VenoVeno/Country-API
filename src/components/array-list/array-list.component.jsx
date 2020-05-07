import React from 'react';

const Array = ({ array }) => {
    return (
        <span>
            {
                array.map((obj, index) => {
                    return (
                        obj.name
                            ? (
                                index
                                    ? <span key={index}>, {obj.name}</span>
                                    : <span key={index}>{obj.name}</span>
                            )
                            : (
                                index
                                    ? <span key={index}>, {obj}</span>
                                    : <span key={index}>{obj}</span>
                            )
                    )
                })
            }
        </span>
    )
}

export default Array;