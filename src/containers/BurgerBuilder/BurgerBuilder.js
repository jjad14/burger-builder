import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary';

class BurgerBuilder extends Component {

    render() {
        return (
            <Auxillary>
                <div>Burger Graphical</div>
                <div>Build Controls</div>
            </Auxillary>
        );
    }

}

export default BurgerBuilder;