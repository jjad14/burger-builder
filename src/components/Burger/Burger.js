import React from 'react';

import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {

    // transform ingredients object to array
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <Ingredient key={ingKey + i} type={ingKey} />;
            });
        });

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;