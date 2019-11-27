import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../utils/helpers';

class FishListItem extends Component{
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func,
        item: PropTypes.string,
    };

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
