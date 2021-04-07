import React from 'react';

import Auxillary from '../../../hoc/Auxillary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ignKey => {
        return (
        <li key={ignKey}>
            <span style={{textTransform: 'capitalize'}}>
                {ignKey}</span>: {props.ingredients[ignKey]}
        </li>)
        });

    return (
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxillary>
    );
};

export default orderSummary;