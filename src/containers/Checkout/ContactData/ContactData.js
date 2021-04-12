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
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: ''
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Your Phone Number'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'Slow', displayValue: 'Slow'},
                        {value: 'Cheapest', displayValue: 'Cheapest'},
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
        const order = {
            ingredients: this.props.ingredients,
            // recalculate the price on the server
            price: this.props.price
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

    render () {
        let form = (
            <form>
                <Input
                    inputtype="input" 
                    elementType="..."
                    elementConfig="..."
                    value=""/>
                <Input 
                    inputtype="input" 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" />
                <Input
                    inputtype="input" 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone Number" />
                <Input 
                    inputtype="input"
                    type="text" 
                    name="street" 
                    placeholder="Street" />
                <Input
                    inputtype="input"
                    type="text" 
                    name="postalCode" 
                    placeholder="Postal Code" />
                <Input
                    inputtype="input"
                    type="text" 
                    name="city" 
                    placeholder="City" />
                <Input
                    inputtype="input"
                    type="text" 
                    name="country" 
                    placeholder="Country" />
                <Button 
                    btnType="Success"
                    clicked={this.orderHandler}>Order</Button>
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