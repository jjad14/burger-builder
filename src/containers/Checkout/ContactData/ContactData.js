import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            postalCode: '',
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
            price: this.props.price,
            customer: {
                name: 'Dennis Martinez',
                phoneNumber: '1234567890',
                email: 'test@test.com',
                address: {
                    street: '123 Main Street',
                    postalCode: 'NT6123',
                    city: 'Toronto',
                    country: 'Canada'
                }
            },
            deliveryMethod: 'Delivery'
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
                    type="text" 
                    name="name" 
                    placeholder="Your Name" />
                <Input 
                    inputtype="input" 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" />
                <Input
                    inputtype="input" 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone #" />
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