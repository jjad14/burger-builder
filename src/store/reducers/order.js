import * as actionTypes from '../actions/actionTypes';

const initalState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            // combine id and orderData params from A.C into one
            const newOrder = {
                ...action.orderData,
                id: action.id
            };

            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        default: 
            return state;
    }
};

export default reducer;