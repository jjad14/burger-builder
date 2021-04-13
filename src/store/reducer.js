import * as actionTypes from './actions';

// define state
const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0,
    },
    totalPrice: 3.50
};

// create reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // ES6 feature, get name of ingredient and overwrite value for it, dyanamically
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // ES6 feature, get name of ingredient and overwrite value for it, dyanamically
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            };
        default:
            return state;
    }
};

export default reducer;