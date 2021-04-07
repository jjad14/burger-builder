import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 1.5,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 3.50,
        purchasable: false,
        purchasing: false
    };

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
        this.setState({purchasable: sum > 0});

    }

    // add ingredient item by type via button
    addIngrdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        // update count
        updatedIngredients[type] = updatedCount;

        //  mapping of ingredient costs
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // Update state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    // remove ingredient item by type via button
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        // update count
        updatedIngredients[type] = updatedCount;

        //  mapping of ingredient costs
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        // Update state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
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
        // alert('You continued!')
    }

    render() {
        return (
            <Auxillary>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchasedCancelled={this.purchaseCancelHandler}
                        purchasedContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredients={this.state.ingredients} 
                    ingredientAdded={this.addIngrdientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Auxillary>
        );
    }

}

export default BurgerBuilder;