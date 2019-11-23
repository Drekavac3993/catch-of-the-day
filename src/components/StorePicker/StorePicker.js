import React, { Component } from 'react';
import { getFunName } from "../utils/helpers";

class StorePicker extends Component {
    inputField = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        const storeName = this.inputField.current.value;
        this.props.history.push(`/store/${ storeName }`)
    };

    render() {
        return (
            <form className="store-selector" onSubmit={ this.goToStore }>
                <h2>Please enter A Store</h2>
                <input
                    type="text"
                    required
                    placeholder="Store Name"
                    defaultValue={ getFunName() }
                    ref={ this.inputField }
                />
                <button type="submit">Visit Store ➙</button>
            </form>
        )
    }
}

export default StorePicker;
