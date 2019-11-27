import React from 'react';
import PropTypes from "prop-types";
import FishListItem from "../FishListItem";

const FishList = (props) => {
    const { fishes, addToOrder } = props;

    return (
        <ul className="fishes">
            {
                Object.keys(fishes)
                    .map((key) =>
                        <FishListItem key={ key }
                                      item={ key }
                                      details={ fishes[key]}
                                      addToOrder={ addToOrder }
                        />)
            }
        </ul>
    )
};

FishList.propTypes = {
    fishes: PropTypes.object,
    addToOrder: PropTypes.func
};


export default FishList
