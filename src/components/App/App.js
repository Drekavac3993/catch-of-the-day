import React, { Component } from 'react';
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

    componentDidMount() {
        const { storeId } = this.props.match.params;
        const localStorageRef = localStorage.getItem(storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${ storeId }/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        const { storeId } = this.props.match.params;
        localStorage.setItem(storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
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

    addToOrder = (item) => {
        const order = { ...this.state.order };
        order[item] = order[item] + 1 || 1;
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
                <Order fishes={ this.state.fishes } order={ this.state.order } />
                <Inventory
                    addFish={ this.addFish }
                    loadSampleFishes={ this.loadSampleFishes }
                    fishes={ this.state.fishes }
                    updateFish={ this.updateFish }
                />
            </div>
        );
    }
}

export default App;
