import React, { Component } from 'react';

import classes from './Order.module.css';

const order = (props) = (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price: <string>CAD 7.00</string></p>
    </div>
);

export default order;