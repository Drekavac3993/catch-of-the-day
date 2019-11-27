import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Order from '../Order';
import Inventory from '../Inventory';
import FishList from '../FishList';
import sampleFishes from '../../sample-fishes';
import base from '../../base';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        const { storeId } = this.props.match.params;
        const localStorageRef = localStorage.getItem(storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.fishes = base.syncState(`${ storeId }/fishes`, {
            context: this,
            state: 'fishes'
        });

        this.order = base.syncState(`${ storeId }/order`, {
            context: this,
            state: 'order'
        });
    }

    componentDidUpdate() {
        const { storeId } = this.props.match.params;
        localStorage.setItem(storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.fishes);
        base.removeBinding(this.order);
    }

    addFish = (fish) => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${ Date.now() }`] = fish;
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes })
    };

    deleteFish = (key) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes });
        this.removeFromOrder(key);
    };

    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    removeFromOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = null;
        this.setState({ order });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: {
                ...this.state.fishes,
                ...sampleFishes
            }
        });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <FishList
                        fishes={ this.state.fishes }
                        addToOrder={ this.addToOrder }
                    />
                </div>
                <Order fishes={ this.state.fishes }
                       order={ this.state.order }
                       removeFromOrder={ this.removeFromOrder }
                />
                <Inventory
                    addFish={ this.addFish }
                    updateFish={ this.updateFish }
                    deleteFish={ this.deleteFish }
                    loadSampleFishes={ this.loadSampleFishes }
                    fishes={ this.state.fishes }
                />
            </div>
        );
    }
}

export default App;
