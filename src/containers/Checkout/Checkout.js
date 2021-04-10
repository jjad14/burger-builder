import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1,
        }
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        query.forEach((value, key) => (ingredients[key] = Number(value)));
        
        this.setState({ingredients});
    }

    checkoutCancelledHandler = () => {
        // go back to the last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // go to contact page without allowing user to go back
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    CheckoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );
    }
}

export default Checkout;