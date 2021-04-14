import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESSS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// async action creator
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // sign up url
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo27ZKLmdj9iMuqGOtX8U3mtyKOv_-Q3g';

        if (!isSignup) {
            // sign in url
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo27ZKLmdj9iMuqGOtX8U3mtyKOv_-Q3g';
        }

        // TODO: Authenticate User
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });

    };
};