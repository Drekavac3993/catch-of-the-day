import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from "../utils/helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component{
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 350, exit: 350 }
        };
        if (!fish) return null;
        if (!isAvailable) {
            return (
                <CSSTransition { ...transitionOptions }>
                    <li key={ key }>
                        Sorry { fish ? fish.name : 'fish' } is no longer available
                        <button onClick={ () => this.props.removeFromOrder(key) }>
                            &times;
                        </button>
                    </li>
                </CSSTransition>
            )
        }

        return (
            <CSSTransition { ...transitionOptions }>
                <li key={ key }>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={ count } timeout={{ enter: 150, exit: 150 }}>
                                <span>{ count } </span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs { fish.name }
                        { formatPrice(count * fish.price) }
                    </span>
                    <button onClick={ () => this.props.removeFromOrder(key) }>
                        &times;
                    </button>
                </li>
            </CSSTransition>
        )
    };

    render() {
        const orderIds = Object.keys(this.props.order);

        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    { orderIds.map(this.renderOrder) }
                </TransitionGroup>
                <div className="total">
                    <strong>{ `Total: ${ formatPrice(total) }` }</strong>
                </div>
            </div>
        )
    }
}

export default Order;
