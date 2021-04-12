import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Cheapest', displayValue: 'Cheapest'},
                        {value: 'Slow', displayValue: 'Slow'},
                        {value: 'fastest', displayValue: 'Fastest'}
                    ]
                },
                value: ''
            },
        },
        loading: false
    };

    orderHandler = (event) => {
        // prevent sending a request causing a  reload
        event.preventDefault();

        this.setState({loading: true});
        // transform state.orderForm so we only get name and the value
        const formData = {};
        for(let formEl in this.state.orderForm) {
            // key value pair {name: value }
            formData[formEl] = this.state.orderForm[formEl].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            // recalculate the price on the server
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    checkFormValidity(value, rules) {
        let isValid = [];
 
        if (rules.required) {
            isValid.push(value.trim() !== '');
        }
    
        if (rules.minLength) {
            isValid.push(value.length >= rules.minLength);
        }
    
        if (rules.maxLength) {
            isValid.push(value.length <= rules.maxLength);
        }
    
        return isValid.indexOf(false) > -1 ? false : true;
    }

    // two-way binding for forms user input
    inputChangedHandler = (event, inputId) => {

        // copy orderForm (not deep)
        const updatedOrderForm = {
            ...this.state.orderForm
        };       
        // get orderForm key (name, email etc)
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };

        // update form element
        updatedFormElement.value = event.target.value;

        // check validity of form element
        updatedFormElement.valid = this.checkFormValidity(updatedFormElement.value, updatedFormElement.validation);

        console.log(updatedFormElement);

        // update the order form with newly updated form element
        updatedOrderForm[inputId] = updatedFormElement;

        // update state
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        const formElementsArray = [];
        
        // convert state.orderForm to jsx elements
        for(let key in this.state.orderForm) {
            formElementsArray.push({
               id: key,
               config: this.state.orderForm[key] 
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formEl => (
                    <Input
                        key={formEl.id} 
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)}/>
                ))}

                <Button 
                    btnType="Success">Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;