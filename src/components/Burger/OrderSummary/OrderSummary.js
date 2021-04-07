import React from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
                btnType="Danger" 
                clicked={props.purchasedCancelled}>CANCEL</Button>
            <Button 
                btnType="Success" 
                clicked={props.purchasedContinued}>CONTINUE</Button>
        </Auxillary>
    );
};



export default orderSummary;