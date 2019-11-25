import React, { Component } from 'react';
import { formatPrice } from '../utils/helpers';

class FishListItem extends Component{
    render() {
        const { details: { name, image, desc, price, status }, addToOrder, item } = this.props;
        const isAvailable = status === 'available';

        return (
            <li className="menu-fish">
                <img src={ image } alt={ name }/>
                <h3 className="fish-name">{ name }
                    <span className="price">{ formatPrice(price) }</span>
                </h3>
                <p>{ desc }</p>
                <button disabled={ !isAvailable } onClick={ () => addToOrder(item) }>
                    { isAvailable ? 'Add To Order' : 'Sold Out!' }
                </button>
            </li>
        )
    }
}

export default FishListItem;
