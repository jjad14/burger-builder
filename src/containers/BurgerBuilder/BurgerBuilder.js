import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('https://burger-builder-c21fb-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         // this.setState({ingredients: res.data});
        //         const ingredients = response.data;
        //         let price = this.state.totalPrice;
        //         let purchasable = this.state.purchasable;

        //         for (let ingredient in ingredients) {
        //             price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
                
        //             if(ingredients[ingredient]>0){
        //                 purchasable = true;
        //             }

        //         }
        //         this.setState({
        //             ingredients: ingredients,
        //             totalPrice: price,
        //             purchasable: purchasable
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    // disable order button by checking ingredient count
    updatePurchaseState(ingredients) {
        // check if there is at least one ingredient on the burger for purchase
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        // purchasable is true if there is at least 1 ingredient
        return sum > 0;

    }

    // open modal via button click
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    // close modal handler via backdrop click
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        let orderSummary = null;
        // loading on render by default until ingredients are loaded
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        // only load if ingredients are loaded
        if (this.props.ings) {
            burger = (
                <Auxillary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredients={this.props.ings} 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </Auxillary>);

            orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchasedCancelled={this.purchaseCancelHandler}
                    purchasedContinued={this.purchaseContinueHandler}/>;
        }

        // check if loading for orderSummary
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Auxillary>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: 
            (ingName) => dispatch({
                type: actionTypes.ADD_INGREDIENT, 
                ingredientName: ingName}),
        onIngredientRemoved: 
            (ingName) => dispatch({
                type: actionTypes.REMOVE_INGREDIENT, 
                ingredientName: ingName}),
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));