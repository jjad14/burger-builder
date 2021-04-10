import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: null,
            meat: null,
            cheese: null,
            bacon: null,
        },
        price: 0
    };

    constructor(props) {
        super(props);
        
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        
        for (let param of query.entries()) {
          if (param[0] === 'price') {
            price = parseFloat(param[1]);
          } else {
            ingredients[param[0]] = parseInt(param[1]);
          }
        }
        
        this.state = {
          ingredients: ingredients,
          price: price
        };
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
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>

                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (
                    <ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.price}
                        {...this.props}/>
                    )}/>
            </div>
        );
    }
}

export default Checkout;