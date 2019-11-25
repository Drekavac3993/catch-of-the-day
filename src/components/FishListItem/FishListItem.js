import React, { Component } from 'react';
import { formatPrice } from '../utils/helpers';

class FishListItem extends Component{
    render() {
        const { name, image, desc, price, status } = this.props.details;
        return (
            <li className="menu-fish">
                <img src={ image } alt={ name }/>
                <h3 className="fish-name">{ name }
                    <span className="price">{ formatPrice(price) }</span>
                </h3>
                <p>{ desc }</p>
                <button>Add To Cart</button>
            </li>
        )
    }
}

export default FishListItem;
