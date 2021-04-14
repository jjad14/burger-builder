import React, { Component } from 'react';
import { connect } from'react-redux';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    validationText: 'A Valid Email is Required'
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    validationText: 'A Password is Required (min 8 characters)'
                },
                valid: false,
                touched: false
            }
        }
    };

    // check validity of form element
    checkFormValidity(value, rules) {
        let isValid = [];

        if(!rules) return true;
 
        if (rules.required) {
            isValid.push(value.trim() !== '');
        }
    
        if (rules.minLength) {
            isValid.push(value.length >= rules.minLength);
        }
    
        if (rules.maxLength) {
            isValid.push(value.length <= rules.maxLength);
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid.push(pattern.test(value));
        }
    
        return isValid.indexOf(false) > -1 ? false : true;
    }

    inputChangedHandler = (event, controlName) => {
        // copy controls (not deep)
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkFormValidity(
                    event.target.value, 
                    this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value
        );
    }

    render() {
        const formElementsArray = [];
        
        // convert state.orderForm to jsx elements
        for(let key in this.state.controls) {
            formElementsArray.push({
               id: key,
               config: this.state.controls[key] 
            });
        }

        const form = formElementsArray.map(formEl => (
            <Input
                key={formEl.id} 
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                changed={(event) => this.inputChangedHandler(event, formEl.id)}/>
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button  btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(
            actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);