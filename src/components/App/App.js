import React, { Component } from 'react';
import Header from '../Header';
import Order from '../Order';
import Inventory from '../Inventory';
import FishList from '../FishList';
import sampleFishes from '../../sample-fishes';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${ Date.now() }`] = fish;
        this.setState({ fishes });
    };

    addToOrder = (item) => {
        const order = { ...this.state.order };
        order[item] = order[item] + 1 || 1;
        this.setState({ order });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
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
                <Order />
                <Inventory
                    addFish={ this.addFish }
                    loadSampleFishes={ this.loadSampleFishes }/>
            </div>

        );
    }
}

export default App;
